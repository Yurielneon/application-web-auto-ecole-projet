<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\TrainingCourseController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});


Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index']);
    Route::get('/specific', [CourseController::class, 'getSpecificCourses']);          // GET /api/courses
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

Route::get('/trainings/global-finished-results', [TrainingController::class, 'getAllGlobalFinishedTrainingResults'])->name('trainings.all-global-finished-results');

Route::prefix('trainings')->group(function () {
    Route::get('/', [TrainingController::class, 'index']);           // Avec pagination
    Route::get('/active', [TrainingController::class, 'getActiveTrainings']); // Sans pagination
    Route::post('/', [TrainingController::class, 'store']);
    Route::get('/{id}', [TrainingController::class, 'show']);
    Route::post('/{id}', [TrainingController::class, 'update']);
    Route::delete('/{id}', [TrainingController::class, 'destroy']);
    Route::get('/{id}/students', [TrainingController::class, 'getStudents']);
    Route::get('/{id}/courses', [TrainingController::class, 'getCourses']);
    Route::post('/{id}/courses', [TrainingCourseController::class, 'addCourseToTraining']);
    Route::delete('/{trainingId}/courses/{courseId}', [TrainingCourseController::class, 'removeCourseFromTraining']);
});
// Route::get('/categories', [TrainingController::class, 'getCategories']);

Route::prefix('students')->group(function () {
    Route::post('/', [StudentController::class, 'store']);
    Route::get('/', [StudentController::class, 'index']);
    Route::get('/{id}', [StudentController::class, 'show']);
    Route::post('/{id}', [StudentController::class, 'update']);
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
Route::post('/students/trainings/{id}', [StudentController::class, 'getStudentsInFormation']);
Route::post('/trainings/{trainingId}/finish', [TrainingController::class, 'finishTraining'])->name('trainings.finish');



Route::get('/trainings/{trainingId}/exams', [ExamController::class, 'getTrainingExams']);
Route::resource('exams', ExamController::class);


Route::prefix('exams')->group(function () {
    Route::get('{exam}/results', [ResultController::class, 'index']);
    Route::post('{exam}/results', [ResultController::class, 'store']);
});

Route::get('/statistics/global', [StatisticsController::class, 'getGlobalStatistics']);






