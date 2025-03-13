<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Liste des résultats d'examen pour un administrateur.
     */
    public function index()
    {
        $results = Result::with('exam', 'student')->get();
        return response()->json($results);
    }

    /**
     * Créer un nouveau résultat d'examen.
     */
    public function store(Request $request)
    {
        // Validation des données
        $validator = Result::validate($request->all());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Création du résultat
        $result = Result::create($request->all());

        return response()->json([
            'message' => 'Résultat créé avec succès.',
            'data' => $result
        ], 201);
    }

    /**
     * Afficher les détails d'un résultat spécifique.
     */
    public function show($id)
    {
        $result = Result::with('exam', 'student')->find($id);

        if (!$result) {
            return response()->json(['message' => 'Résultat non trouvé.'], 404);
        }

        return response()->json($result);
    }

    /**
     * Mettre à jour un résultat d'examen existant.
     */
    public function update(Request $request, $id)
    {
        $result = Result::find($id);

        if (!$result) {
            return response()->json(['message' => 'Résultat non trouvé.'], 404);
        }

        // Validation des données
        $validator = Result::validate($request->all());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mise à jour du résultat
        $result->update($request->all());

        return response()->json([
            'message' => 'Résultat mis à jour avec succès.',
            'data' => $result
        ]);
    }

    /**
     * Supprimer un résultat d'examen.
     */
    public function destroy($id)
    {
        $result = Result::find($id);

        if (!$result) {
            return response()->json(['message' => 'Résultat non trouvé.'], 404);
        }

        $result->delete();

        return response()->json(['message' => 'Résultat supprimé avec succès.']);
    }
}
