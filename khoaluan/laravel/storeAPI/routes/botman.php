<?php
use App\Http\Controllers\BotManController;

$botman = resolve('botman');

$botman->hears('Hi', function ($bot) {
	$bot->reply('Hello!');
});
$botman->hears('xin chao', function ($bot) {
	$bot->reply('NO!');
});
$botman->hears('Start conversation', BotManController::class.'@startConversation');
