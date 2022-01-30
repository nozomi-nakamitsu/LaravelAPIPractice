<?php

namespace App\Repositories;

use App\Models\Photo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

interface PhotoRepository
{
    /**
     * create instance
     * @return mixed
     */
    public function query();

    /**
     * Add conditions.
     *
     * @param string $field
     * @param $value
     * @return mixed
     */
    public function where(string $field, $value);

    /**
     * Add relations
     *
     * @param array $relations
     * @return mixed
     */
    public function with(array $relations);
    
    /**
     * Order results.
     *
     * @param string $field
     * @return mixed
     */
    public function orderBy(string $field);

    /**
     * Get results.
     *
     * @return mixed
     */
    public function get();

    /**
    * Get first result.
    *
    * @return mixed
    */
    public function first();
}
