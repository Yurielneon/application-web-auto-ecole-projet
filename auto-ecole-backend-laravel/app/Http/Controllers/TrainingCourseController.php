<?php

namespace App\Http\Controllers;

use App\Models\TrainingCourse;
use Illuminate\Http\Request;

class TrainingCourseController extends Controller
{
    /**
     * Liste des cours associés aux formations.
     */
    public function index()
    {
        $trainingCourses = TrainingCourse::with(['training', 'course'])->get();
        return response()->json($trainingCourses);
    }

    /**
     * Associer un cours à une formation.
     */
    public function store(Request $request)
    {
        // Création de l'association formation-cours
        $trainingCourse = TrainingCourse::create([
            'training_id' => $request->training_id,
            'course_id' => $request->course_id,
        ]);

        return response()->json([
            'message' => 'Cours associé à la formation avec succès.',
            'data' => $trainingCourse
        ], 201);
    }

    /**
     * Afficher un cours associé à une formation spécifique.
     */
    public function show($id)
    {
        $trainingCourse = TrainingCourse::with(['training', 'course'])->find($id);

        if (!$trainingCourse) {
            return response()->json(['message' => 'Association non trouvée.'], 404);
        }

        return response()->json($trainingCourse);
    }

    /**
     * Mettre à jour une association formation-cours.
     */
    public function update(Request $request, $id)
    {
        $trainingCourse = TrainingCourse::find($id);

        if (!$trainingCourse) {
            return response()->json(['message' => 'Association non trouvée.'], 404);
        }

        // Mise à jour de l'association
        $trainingCourse->update([
            'training_id' => $request->training_id,
            'course_id' => $request->course_id,
        ]);

        return response()->json([
            'message' => 'Association mise à jour avec succès.',
            'data' => $trainingCourse
        ]);
    }

    /**
     * Supprimer une association formation-cours.
     */
    public function destroy($id)
    {
        $trainingCourse = TrainingCourse::find($id);

        if (!$trainingCourse) {
            return response()->json(['message' => 'Association non trouvée.'], 404);
        }

        $trainingCourse->delete();

        return response()->json(['message' => 'Association supprimée avec succès.']);
    }
}
