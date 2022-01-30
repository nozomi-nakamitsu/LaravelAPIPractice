<?php

namespace App\Repositories;

use App\Models\Photo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EloquentPhotoRepository implements PhotoRepository
{
    private $query;

    public function __construct()
    {
        $this->query = Photo::query();
    }

    public function query()
    {
        $this->query = Photo::query();

        return $this;
    }

    /**
    * {@inheritdoc}
    * @return $this
    */
    public function where(string $field, $value)
    {
        $this->query
            ->where($field, $value);

        return $this;
    }

    /**
     * {@inheritdoc}
     * @return Builder[]|Collection
     */
    public function get()
    {
        $result = $this->query
            ->get();

        $this->query();

        return $result;
    }

    /**
     * {@inheritdoc}
     * @return $this
     */
    public function with(array $relations)
    {
        $this->query
            ->with($relations);

        return $this;
    }

    /**
     * {@inheritdoc}
     * @return $this
     */
    public function orderBy(string $field)
    {
        $this->query
            ->orderBy($field);

        return $this;
    }

    /**
    * @return Builder|Model|object|null
    */
    public function first()
    {
        return $this->query
            ->first();
    }
}
