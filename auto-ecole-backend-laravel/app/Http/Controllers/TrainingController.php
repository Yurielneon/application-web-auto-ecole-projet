<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    /**
     * Récupérer toutes les formations.
     */
    public function index()
    {
        $trainings = Training::paginate(10);
        return response()->json($trainings, 200);
    }

    /**
     * Créer une nouvelle formation.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Training::validate($data);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $training = Training::create($data);
        // Créer automatiquement deux examens prédéfinis
        $training->exams()->createMany([
            [
                'name' => 'Code',
                'type' => 'Théorique',
                'date' => null, // Date à définir plus tard par l'admin
            ],
            [
                'name' => 'Conduite',
                'type' => 'Pratique',
                'date' => null,
            ],
        ]);
        $training->load('category'); // Charger la relation category

        return response()->json(['message' => 'Formation créée avec succès.', 'training' => $training], 201);
    }


    /**
     * Mettre à jour une formation existante.
     */

    public function update(Request $request, $id)
    {
        $training = Training::findOrFail($id);
        $data = $request->all();
        $validator = Training::validate($data);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $training->update($data);
        $training->load('category'); // Charger la relation category

        return response()->json(['message' => 'Formation mise à jour avec succès.', 'training' => $training], 200);
    }

    /**
     * Récupérer les détails d'une formation spécifique.
     */
    public function show($id)
    {
        $training = Training::findOrFail($id);
        return response()->json($training, 200);
    }



    /**
     * Supprimer une formation.
     */
    public function destroy($id)
    {
        $training = Training::findOrFail($id);

        // Suppression de la formation
        $training->delete();

        return response()->json(['message' => 'Formation supprimée avec succès.'], 200);
    }

    public function getCategories()
    {
        $categories = \App\Models\Category::all(['id', 'name']);
        return response()->json($categories, 200);
    }

    /**
     * Récupérer toutes les formations en cours sans pagination.
     */
    public function getActiveTrainings()
    {
        $trainings = Training::where('start_date', '>=', now()->startOfDay())
            ->where('registration_end_date', '>=', now()->startOfDay())
            ->with('category')
            ->get();
        return response()->json(['trainings' => $trainings], 200);
    }

    /** obtenir tous les cours relatif a la formation
     */
    public function getTrainingCourses($id)
    {
        $training = Training::with('courses')->findOrFail($id);
        return response()->json(
            $training->courses->map(function ($course) {
                return [
                    'id' => $course->id,
                    'name' => $course->name,
                    'type' => $course->type,
                    'file_path' => $course->file_path,
                ];
            })
        );
    }
}
