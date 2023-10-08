<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // /**
    //  * Get all Users
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasMany
    //  */
    // public function getUsers(): HasMany
    // {
    //     return $this->hasMany(User::class);
    // }

    // /**
    //  * Get the User associated with the $id
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */
    // public function getUser($id)
    // {
    //     return $this->find($id);
    // }

    // /**
    //  * Create a new User
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */
    // public function createUser($data)
    // {
    //     return $this->create($data);
    // }

    // /**
    //  * Update the User associated with the $id
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */
    // public function updateUser($id, $data)
    // {
    //     return $this->find($id)->update($data);
    // }

    // /**
    //  * Delete the User associated with the $id
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */
    // public function deleteUser($id)
    // {
    //     return $this->find($id)->delete();
    // }

    // public function getUserLogin($email, $password)
    // {
    //     return $this->where('email', $email)->where('password', $password)->first();
    // }


}
