<?php
use Laravel\Sanctum\Sanctum;

use Illuminate\Http\Request; // <-- Correction de l'importation (Steve)
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TrainingController;
use Illuminate\Support\Facades\Route;
use App\Models\Student; // <-- Ajoutez cette ligne (Steve)


Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});


Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index']);          // GET /api/courses
    Route::get('/{id}', [CourseController::class, 'show']);       // GET /api/courses/{id}
    Route::post('/', [CourseController::class, 'store']);         // POST /api/courses
    Route::put('/{id}', [CourseController::class, 'update'])     // POST /api/courses/{id} (avec _method=PUT)
        ->where('id', '[0-9]+');
    Route::delete('/{id}', [CourseController::class, 'destroy']); // DELETE /api/courses/{id}
});

Route::middleware('auth:api')->get('/dashboard', function () {
    return response()->json(['message' => 'Welcome to the Dashboard']);
});
Route::middleware('auth:api')->post('/auth/verify', function () {
    return response()->json(['valid' => true]);
});


Route::prefix('trainings')->group(function () {
    Route::get('/', [TrainingController::class, 'index']);           // Avec pagination
    Route::get('/active', [TrainingController::class, 'getActiveTrainings']); // Sans pagination
    Route::post('/', [TrainingController::class, 'store']);
    Route::get('/{id}', [TrainingController::class, 'show']);
    Route::put('/{id}', [TrainingController::class, 'update']);
    Route::delete('/{id}', [TrainingController::class, 'destroy']);
});
// Route::get('/categories', [TrainingController::class, 'getCategories']);

Route::prefix('students')->group(function () {
    Route::post('/', [StudentController::class, 'store']);
    Route::get('/', [StudentController::class, 'index']);
    Route::get('/{id}', [StudentController::class, 'show']);
    Route::put('/{id}', [StudentController::class, 'update']);
    Route::delete('/{id}', [StudentController::class, 'destroy']);
});

Route::prefix('notifications')->group(function () {
    Route::get('/', [StudentController::class, 'getNotifications']);
    Route::put('/{id}/read', [StudentController::class, 'markNotificationAsRead']);
    Route::delete('/{id}', [StudentController::class, 'deleteNotification']);
    Route::delete('/', [StudentController::class, 'deleteAllNotifications']);
});

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/pending-students', [StudentController::class, 'pendingStudents']);
Route::get('/validated-students', [StudentController::class, 'getAllStudents']);

Route::post('/students/{id}/approve', [StudentController::class, 'approveStudent']);
Route::post('/students/{id}/reject', [StudentController::class, 'rejectStudent']);

Route::post('/login', function (Request $request) { # Steve added this route
    $credentials = $request->only('email', 'password');
    
    // Vérification explicite avec statut
    $student = Student::where('email', $credentials['email'])
                      ->where('status', 'validated')
                      ->first();

    if ($student && Hash::check($credentials['password'], $student->password)) {
        Auth::guard('student')->login($student);
        $request->session()->regenerate();
        return response()->json($student);
    }

    return response()->json(['error' => 'Compte non valide ou non validé'], 401);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) { # Steve added this route
    return $request->user();
});

// Route::post('/logout', function (Request $request) { # Steve added this route
//     Auth::guard('web')->logout();
//     $request->session()->invalidate();
//     return response()->json(['message' => 'Déconnecté']);
// });

Route::post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    
    return response()->json(['message' => 'Déconnecté avec succès']);
})->middleware('auth:sanctum');

Route::post('/register', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $student = Student::where('email', $request->email)->first();

    if (!$student) {
        return response()->json([
            'error' => 'Aucun compte étudiant trouvé avec cet email'
        ], 404);
    }

    if ($student->status !== 'validated') {
        return response()->json([
            'error' => 'Votre compte n\'est pas encore validé par l\'administration'
        ], 403);
    }

    try {
        $student->password = Hash::make($request->password);
        $student->save();

        // Création du token Sanctum
        $token = $student->createToken('student-token')->plainTextToken;

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès',
            'token' => $token
        ]);
    } catch (\Exception $e) {
        \Log::error('Erreur password update', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'error' => 'Erreur lors de la mise à jour du mot de passe'
        ], 500);
    }
});






