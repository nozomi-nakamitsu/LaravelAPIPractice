<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Photo extends Model
{
    use HasFactory;
    /**
 * リレーションシップ - usersテーブル
 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
 */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /** JSONに含める属性 */
    protected $visible = [
    'id', 'user', 'url',"filename","is_favorite","favorite_count"
    ];
    /** JSONに含めるアクセサ */
    protected $appends = [ 'is_favorite', 'favorite_count',
    ];
    /**
     * リレーションシップ - usersテーブル
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }
    /**
     * アクセサ - favorite_count
     * @return int
     */
    public function getFavoriteCountAttribute()
    {
        return $this->likes->count();
    }
    /**
     * アクセサ - is_favorite
     * @return boolean
     */
    public function getIsFavoriteAttribute()
    {
        if (Auth::guest()) {
            return false;
        }
        return $this->likes->contains(function ($user) {
            return $user->id === Auth::user()->id;
        });
    }
}
