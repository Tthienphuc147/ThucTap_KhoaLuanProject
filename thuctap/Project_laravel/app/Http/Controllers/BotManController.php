<?php

namespace App\Http\Controllers;

use BotMan\BotMan;
use Illuminate\Http\Request;
use App\Conversations\ExampleConversation;

class BotManController extends Controller
{

    public function handle()
    {
        $botman = app('botman');

        $botman->listen();
    }


    public function tinker()
    {
        return view('tinker');
    }
     public function index()
    {
        return view('chat');
    }


    public function startConversation(BotMan $bot)
    {
        $bot->startConversation(new ExampleConversation());
    }
}
