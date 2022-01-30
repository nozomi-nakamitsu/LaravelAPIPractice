<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\PhotoRepository;
use App\Repositories\EloquentPhotoRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            PhotoRepository::class,
            EloquentPhotoRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
