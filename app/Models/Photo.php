<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    'id', 'user', 'url',"filename"
];
}
