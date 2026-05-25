import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

@Component({
  selector: 'app-pacman',
  imports: [],
  templateUrl: './pacman.html',
  styleUrls: [
    './css/pacman.css',
    './css/pacman-home.css'
  ],
})
export class Pacman implements OnInit, OnDestroy {

    @HostBinding('style.background-color') bgColor = 'black';
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.min-height') minHeight = '92.5vh';
    @HostBinding('style.margin') margin = '-1.5rem'; // compensa el p-4 del main

  ngOnInit(): void {
    // jQuery and all game scripts are loaded via angular.json scripts array.
    // Once the DOM is ready, initialize the game.
    const $ = (window as any)['$'];
    if (!$) {
      console.error('jQuery not loaded. Add game scripts to angular.json scripts array.');
      return;
    }

    const win = window as any;

    win.simulateKeyup = function(code: number) {
      const e = $.Event('keyup');
      e.keyCode = code;
      $('body').trigger(e);
    };

    win.simulateKeydown = function(code: number) {
      const e = $.Event('keydown');
      e.keyCode = code;
      $('body').trigger(e);
    };

    $(document).ready(() => {
      win.loadAllSound();

      win.HELP_TIMER = setInterval('blinkHelp()', win.HELP_DELAY);

      win.initHome();

      $('.sound').click((e: any) => {
        e.stopPropagation();
        const sound = $(this).attr('data-sound');
        if (sound === 'on') {
          $('.sound').attr('data-sound', 'off');
          $('.sound').find('img').attr('src', 'assets/pacman/img/sound-off.png');
          win.GROUP_SOUND.mute();
        } else {
          $('.sound').attr('data-sound', 'on');
          $('.sound').find('img').attr('src', 'assets/pacman/img/sound-on.png');
          win.GROUP_SOUND.unmute();
        }
      });

      $('.help-button, #help').click(function(e: any) {
        e.stopPropagation();
        if (!win.PACMAN_DEAD && !win.LOCK && !win.GAMEOVER) {
          if ($('#help').css('display') === 'none') {
            $('#help').fadeIn('slow');
            $('.help-button').hide();
            if ($('#panel').css('display') !== 'none') {
              win.pauseGame();
            
            }
          } else {
            $('#help').fadeOut('slow');
            $('.help-button').show();
          }
        }
      });

      $('.github').click((e: any) => e.stopPropagation());

      $('#home').on('click touchstart', function(e: any) {
        if ($('#help').css('display') === 'none') {
          e.preventDefault();
          win.simulateKeydown(13);
        }
      });

      $('#control-up, #control-up-second, #control-up-big').on('mousedown touchstart', function(e: any) {
        e.preventDefault();
        win.simulateKeydown(38);
        win.simulateKeyup(13);
      });
      $('#control-down, #control-down-second, #control-down-big').on('mousedown touchstart', function(e: any) {
        e.preventDefault();
        win.simulateKeydown(40);
        win.simulateKeyup(13);
      });
      $('#control-left, #control-left-big').on('mousedown touchstart', function(e: any) {
        e.preventDefault();
        win.simulateKeydown(37);
        win.simulateKeyup(13);
      });
      $('#control-right, #control-right-big').on('mousedown touchstart', function(e: any) {
        e.preventDefault();
        win.simulateKeydown(39);
        win.simulateKeyup(13);
      });

      $('body').keyup(() => { win.KEYDOWN = false; });

      $('body').keydown(function(e: any) {
        if (win.HOME) {
          win.initGame(true);
        } else {
          win.KEYDOWN = true;
          if (win.PACMAN_DEAD && !win.LOCK) {
            win.erasePacman();
            win.resetPacman();
            win.drawPacman();
            win.eraseGhosts();
            win.resetGhosts();
            win.drawGhosts();
            win.moveGhosts();
            win.blinkSuperBubbles();
          } else if (e.keyCode >= 37 && e.keyCode <= 40 && !win.PAUSE && !win.PACMAN_DEAD && !win.LOCK) {
            if (e.keyCode === 39) win.movePacman(1);
            else if (e.keyCode === 40) win.movePacman(2);
            else if (e.keyCode === 37) win.movePacman(3);
            else if (e.keyCode === 38) win.movePacman(4);
          } else if (e.keyCode === 80 && !win.PACMAN_DEAD && !win.LOCK) {
            if (win.PAUSE) win.resumeGame();
            else win.pauseGame();
          } else if (win.GAMEOVER) {
            win.initHome();
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    // Clean up jQuery event listeners when component is destroyed
    const $ = (window as any)['$'];
    if ($) {
      $('body').off('keyup keydown');
      $('.sound, .help-button, #help, #home').off();
      $('#control-up, #control-up-second, #control-up-big').off();
      $('#control-down, #control-down-second, #control-down-big').off();
      $('#control-left, #control-left-big').off();
      $('#control-right, #control-right-big').off();
    }
  }
}
