<?php

namespace App\Observers;

use App\Constants\CacheRemovalTags;
use App\Services\User\UserManagementService;
use App\User;
use Illuminate\Support\Facades\Cache;

class UserObserver
{
    /**
     * Handle the user "created" event.
     *
     * @param  User  $user
     * @return void
     */
    public function created(User $user)
    {
        Cache::tags([CacheRemovalTags::USER['SAVE']])->flush();
        Cache::forget(UserManagementService::getUserCacheKey($user->id));
        Cache::forget(UserManagementService::getPublicUserInfoCacheKey($user->id));
    }

    /**
     * Handle the user "updated" event.
     *
     * @param  User  $user
     * @return void
     */
    public function updated(User $user)
    {
        Cache::tags([CacheRemovalTags::USER['SAVE']])->flush();
        Cache::forget(UserManagementService::getUserCacheKey($user->id));
        Cache::forget(UserManagementService::getPublicUserInfoCacheKey($user->id));
    }

    /**
     * Handle the user "deleted" event.
     *
     * @param  User  $user
     * @return void
     */
    public function deleted(User $user)
    {
        //
    }

    /**
     * Handle the user "restored" event.
     *
     * @param  User  $user
     * @return void
     */
    public function restored(User $user)
    {
        //
    }

    /**
     * Handle the user "force deleted" event.
     *
     * @param  User  $user
     * @return void
     */
    public function forceDeleted(User $user)
    {
        //
    }
}
