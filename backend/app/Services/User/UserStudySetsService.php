<?php


namespace App\Services\User;

use App\Constants\CacheRemovalTags;
use DB;
use Illuminate\Support\Facades\Cache;

class UserStudySetsService
{
    public static function getAllStudySetsCacheKey($user_id)
    {
        return 'user_' . $user_id . '_all_study_sets';
    }

    public static function getAllStudySets($user_id, $options)
    {
        $options = (object)$options;
        
        return Cache::tags([CacheRemovalTags::STUDY_SET['SAVE'], CacheRemovalTags::STUDY_SET['DELETE']])
            ->rememberForever(self::getAllStudySetsCacheKey($user_id), function () use ($user_id, $options) {
                return DB::table('user_study_sets')
                    ->select('study_sets.id', 'role', 'title', 'view_permission', 'edit_permission', 'study_sets.created_at', 'study_sets.updated_at', DB::raw('count(terms.id) as total_terms'),
                        'user_id')
                    ->join('study_sets', 'study_sets.id', '=', 'user_study_sets.study_set_id')
                    ->leftJoin('terms', 'terms.study_set_id', '=', 'study_sets.id')
                    ->where('user_id', '=', $user_id)
                    ->groupBy('study_sets.id', 'user_id')
                    ->orderBy($options->order_by, $options->order_direction)
                    ->get()->toArray();
            });
    }
}