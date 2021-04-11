<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Elasticquent\ElasticquentTrait;

/**
 * Class User
 * @package App
 * @property int $id
 * @property string $username
 * @property string $name
 * @property string $password
 * @property string $profile_picture_url
 * @property \App\Enums\SupportedLanguages $language
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use ElasticquentTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'password', 'googleId', 'facebookId'
    ];

    /**
     * Set a mappingProperties property for mapping in Elasticsearch/Eloquent
     *
     */
    protected $mappingProperties = array(
        'name' => [
            'type' => 'text',
            'analyzer' => 'standard'
        ],
        'username' => [
            'type' => 'text',
            'analyzer' => 'standard'
        ],
    );

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'google_id', 'facebook_id', 'password'
    ];

    /**
     * The study sets that this user currently has (including both study sets created by that user and study sets created
     * by others).
     */
    public function studySets()
    {
        return $this->belongsToMany('App\StudySet', 'user_study_sets');
    }

    /**
     * The classes this user may be related to.
     */
    public function classes()
    {
        return $this->belongsToMany('App\StudyClass', 'user_classes', 'user_id', 'class_id');
    }

    /**
     * The terms this user may be currently learning
     */
    public function learningTerms()
    {
        return $this->belongsToMany('App\Term', 'user_terms');
    }

    /**
     * The live sessions this user may be the host
     */
    public function hostedLiveSessions()
    {
        return $this->hasMany('App\LiveSession');
    }

    /*
     * The details of all live sessions this user is related to
     */
    public function liveSessionDetails()
    {
        return $this->hasMany('App\LiveSessionDetail');
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        $userProfile = [
            'id' => $this->id,
            'name' => $this->name,
            'language' => $this->language,
            'profilePictureUrl' => $this->profile_picture_url
        ];

        return ['userProfile' => $userProfile];
    }
}