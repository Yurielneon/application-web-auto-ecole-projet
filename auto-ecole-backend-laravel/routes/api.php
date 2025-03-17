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
use Illuminate\Support\Facades\Hash;


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
    Route::put('/{id}', [CourseController::class, 'update'])      // POST /api/courses/{id} (avec _method=PUT)
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

// Route::post('/login', function (Request $request) {
//     $credentials = $request->only('email', 'password');

//     // 1. Recherche du student par email (sans vérifier le statut)
//     $student = Student::where('email', $credentials['email'])->first();

//     // 2. Vérification de l'existence du compte
//     if (!$student) {
//         return response()->json(['error' => 'Email non trouvé']);
//     }

//     // 3. Vérification du statut "validated"
//     if ($student->status !== 'validated') {
//         return response()->json(['error' => 'Compte en attente de validation']);
//     }

//     // 4. Vérification du mot de passe
//     if (!Hash::check($credentials['password'], $student->password)) {
//         return response()->json(['error' => 'Mot de passe incorrect']);
//     }

//     // 5. Connexion réussie
//     Auth::guard('student')->login($student);
//     $request->session()->regenerate();
//     return response()->json($student);
// });

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    // Recherche manuelle de l'utilisateur
    $student = Student::where('email', $request->email)->first();

    if (!$student || !Hash::check($request->password, $student->password)) {
        return response()->json(['error' => 'Identifiants invalides'], 401);
    }

    // Création du token Sanctum
    $token = $student->createToken('auth_token')->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'student' => $student
    ]);
});

// Route::post('/logout', function (Request $request) { # Steve added this route
//     Auth::guard('web')->logout();
//     $request->session()->invalidate();
//     return response()->json(['message' => 'Déconnecté']);
// });

// Route protégée pour récupérer l'étudiant connecté
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user()->load('training') // Chargez les relations si nécessaire
    ]);
});

Route::middleware('auth:sanctum')->get('/student-connected', function (Request $request) {
    return response()->json([
        'student' => $request->user()->only('id', 'first_name', 'last_name', 'email', 'profile_picture'),
        'profile_picture_url' => $request->user()->profile_picture_url // Ajoutez un accessor dans le modèle
    ]);
});

Route::post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Déconnexion réussie']);
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
        ]);
    }

    if ($student->status !== 'validated') {
        return response()->json([
            'error' => 'Votre compte n\'est pas encore validé par l\'administration'
        ]);
    }

    try {
        $student->password = $request->password;
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






