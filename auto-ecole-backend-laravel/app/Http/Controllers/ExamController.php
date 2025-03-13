<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Liste des examens pour un administrateur.
     */
    public function index()
    {
        $exams = Exam::with('training')->get();
        return response()->json($exams);
    }

    /**
     * Créer un nouvel examen.
     */
    public function store(Request $request)
    {
        // Validation des données
        $validator = Exam::validate($request->all());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Création de l'examen
        $exam = Exam::create($request->all());

        return response()->json([
            'message' => 'Examen créé avec succès.',
            'data' => $exam
        ], 201);
    }

    /**
     * Afficher les détails d'un examen spécifique.
     */
    public function show($id)
    {
        $exam = Exam::with('training')->find($id);

        if (!$exam) {
            return response()->json(['message' => 'Examen non trouvé.'], 404);
        }

        return response()->json($exam);
    }

    /**
     * Mettre à jour un examen existant.
     */
    public function update(Request $request, $id)
    {
        $exam = Exam::find($id);

        if (!$exam) {
            return response()->json(['message' => 'Examen non trouvé.'], 404);
        }

        // Validation des données
        $validator = Exam::validate($request->all());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mise à jour de l'examen
        $exam->update($request->all());

        return response()->json([
            'message' => 'Examen mis à jour avec succès.',
            'data' => $exam
        ]);
    }

    /**
     * Supprimer un examen.
     */
    public function destroy($id)
    {
        $exam = Exam::find($id);

        if (!$exam) {
            return response()->json(['message' => 'Examen non trouvé.'], 404);
        }

        $exam->delete();

        return response()->json(['message' => 'Examen supprimé avec succès.']);
    }
}
