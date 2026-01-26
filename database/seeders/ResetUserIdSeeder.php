<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResetUserIdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus user dengan ID 6 dan 7
        DB::table('users')->whereIn('id', [6, 7])->delete();

        // Reset auto increment ke ID maksimal + 1
        $maxId = DB::table('users')->max('id');
        $nextId = $maxId ? $maxId + 1 : 1;

        DB::statement("ALTER TABLE users AUTO_INCREMENT = {$nextId}");

        $this->command->info("Users dengan ID 6 dan 7 telah dihapus.");
        $this->command->info("Auto increment di-reset ke: {$nextId}");
    }
}
