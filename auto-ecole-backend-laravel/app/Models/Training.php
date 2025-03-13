<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Training extends Model
{
    use HasFactory;

    /**
     * Table associée au modèle.
     *
     * @var string
     */
    protected $table = 'trainings';

    /**
     * Attributs modifiables.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'duration_weeks',
        'price',
        'category_id',
        'schedule',
        'registration_end_date'
    ];

    /**
     * Cast du champ 'schedule' en tableau.
     */
    protected $casts = [
        'schedule' => 'array',  // Conversion du JSON en array pour une meilleure manipulation
    ];


    public static $rules = [
        'title' => 'required|string|min:3|max:255',
        'description' => 'required|string|min:5|max:1000',
        'start_date' => 'required|date|after_or_equal:today',
        'duration_weeks' => 'required|integer|min:1',
        'price' => 'required|numeric|min:0',
        'category_id' => 'required|exists:categories,id',
        'schedule' => 'nullable',
        'registration_end_date' => 'required|date|after_or_equal:today',
    ];

    public static $messages = [
        'title.required' => 'Le titre de la formation est requis.',
        'title.string' => 'Le titre doit être une chaîne de caractères.',
        'title.min' => 'Le titre au moins contenir 3 caractères.',
        'title.max' => 'Le titre ne doit pas dépasser 255 caractères.',
        'description.required' => 'La description est requise.',
        'description.string' => 'La description doit être une chaîne de caractères.',
        'description.min' => 'La description doit au moins contenir 5 caractères.',
        'description.max' => 'La description ne doit pas dépasser 1000 caractères.',
        'start_date.required' => 'La date de début est requise.',
        'start_date.date' => 'La date de début doit être une date valide.',
        'start_date.after_or_equal' => 'La date de début ne peut pas être antérieure à aujourd\'hui.',
        'duration_weeks.required' => 'La durée de la formation en semaines est requise.',
        'duration_weeks.integer' => 'La durée de la formation doit être un entier.',
        'duration_weeks.min' => 'La durée de la formation doit être d\'au moins 1 semaine.',
        'price.required' => 'Le prix de la formation est requis.',
        'price.numeric' => 'Le prix doit être un nombre.',
        'price.min' => 'Le prix ne peut pas être inférieur à 0.',
        'category_id.required' => 'La catégorie de la formation est requise.',
        'category_id.exists' => 'La catégorie sélectionnée est invalide.',        
        'registration_end_date.required' => 'La date de fin d\'inscription est requise.',
        'registration_end_date.date' => 'La date de fin d\'inscription doit être une date valide.',
        'registration_end_date.after_or_equal' => 'La date de fin d\'inscription doit être égale ou postérieure à aujoudh\'ui ',
    ];

    public static function validate($data)
    {
        return Validator::make($data, self::$rules, self::$messages);
    }

    /**
     * Relation avec la catégorie.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relation un-à-plusieurs avec les étudiants.
     */
    public function students()
    {
        return $this->hasMany(Student::class);
    }

    /**
     * Relation un-à-plusieurs avec les examens.
     */
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

    /**
     * Relation un-à-plusieurs avec TrainingCourse (table pivot).
     */
    public function trainingCourses()
    {
        return $this->hasMany(TrainingCourse::class);
    }

    /**
     * Relation plusieurs-à-plusieurs avec les cours.
     */
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'training_courses');
    }
}
