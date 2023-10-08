<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

        /**
        * The attributes that are mass assignable.
        *
        * @var array
        */
        protected $fillable = [
            'name',
            'description',
            'price',
            'stock'
        ];

    // /**
    //  * Get the user that owns the Product
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    //  */
    // public function user(): BelongsTo
    // {
    //     return $this->belongsTo(User::class);
    // }


    // /**
    //  * Get all products
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasMany
    //  */
    // public function getProducts(): HasMany
    // {
    //     return $this->hasMany(Product::class);
    // }

    // /**
    //  * Get the product associated with the $id
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */
    // public function getProduct($id)
    // {
    //     return $this->find($id);
    // }

    // /**
    //  * Create a new product
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */
    // public function createProduct($data)
    // {
    //     return $this->create($data);
    // }

    // /**
    //  * Update the product associated with the $id
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */
    // public function updateProduct($id, $data)
    // {
    //     return $this->find($id)->update($data);
    // }

    // /**
    //  * Delete the product associated with the $id
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\HasOne
    //  */

    // public function deleteProduct($id)
    // {
    //     return $this->find($id)->delete();
    // }

}
