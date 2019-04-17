
$(document).ready( function(){
     var
     id_song=-1, Song, i,
         songs= [
             muz_one = [0, 'RHCP - Show', 'music/RHCP-Show.mp3', 334.706939],
             muz_two = [1, 'Scorpions - Wind of change', 'music/scorpions_-_wind-of-change.mp3', 264.672625],
             muz_three = [2, 'Kiss - I Was Made For Lovin You Baby', 'music/Kiss-I Was Made For Lovin You Baby.mp3', 342.311775],
             muz_four = [3, 'Avichi - Hey Brother', 'music/Avicii - Hey Brother.mp3', 254.040816],
             muz_five = [4, 'Band Of Horses - The Funeral', 'music/Band Of Horses - The Funeral (Excision Remix).mp3', 296.777143],
             muz_six = [5, 'Ed Sheeran - Bloodstream', 'music/Ed Sheeran - Bloodstream.mp3', 202.3738],
             muz_seven = [6, 'Glen Morison - Goodbay', 'music/Glen Morison - Goodbay.mp3', 178.337938],
             muz_eight = [7, 'Imagine Dragons - All Eyes', 'music/Imagine Dragons - All Eyes.mp3', 292.391756],
             muz_nine = [8, 'Milky Chance - Stolen Dance', 'music/Milky Chance - Stolen Dance.mp3', 360.12],
             muz_ten = [9, 'Nickelback - Photograph', 'music/Nickelback - Photograph.mp3', 260.502688],
             muz_eleven = [10, 'Pink Floyd - Brain Damage', 'music/Pink Floyd - Brain Damage.mp3', 202.65795],
             muz_twelve = [11, 'The XX - Crystalised', 'music/The XX - Crystalised.mp3', 193.985281],
             muz_thirteen = [12, 'Zella Day - Compass', 'music/Zella Day - Compass.mp3', 223.817143]
         ],volume = 1, mute = false;

     /*продолжительность пісні*/
    /* Song = new Audio(songs[8][2]);
     Song.addEventListener('loadedmetadata', function(){
         console.log(this.duration);
     });
     Song = new Audio(songs[9][2]);
     Song.addEventListener('loadedmetadata', function(){
         console.log(this.duration);
     });
     Song = new Audio(songs[10][2]);
     Song.addEventListener('loadedmetadata', function(){
         console.log(this.duration);
     });
     Song = new Audio(songs[11][2]);
     Song.addEventListener('loadedmetadata', function(){
         console.log(this.duration);
     });
    Song = new Audio(songs[12][2]);
    Song.addEventListener('loadedmetadata', function(){
        console.log(this.duration);
    });*/


     for(i=0; i<songs.length; i++) {
         $('.wrp').append('<div class="song" id='+ songs[i][0]+'><div class="play-pause_song"></div><div class="nameSong_song">'+songs[i][1]+'</div><div class="duration_song">'+ parseInt(songs[i][3]/60)+':'+ parseInt(songs[i][3]%60) +'</div></div>');
     }

    function playNewSong(id) {
        var
            curtime, cur = -100;
        $('.player .nameSong').text(songs[id][1]);
        $('.play-pause').attr('id', id);
        id_song = Number(id);
        Song = new Audio(songs[id][2]);
        $('.play-pause').css({'background-position':'8px -35px'});
        $('.song#'+id+' .play-pause_song').css({'background-position':'4px -17px'});
        Song.play();
        Song.volume = volume;
        Song.addEventListener('timeupdate', function(){
            curtime = Song.currentTime;
            cur = -((songs[id_song][3] - curtime)*100)/songs[id_song][3];
            $('.time').text(parseInt(curtime/60)+':'+parseInt(curtime%60));
            $('.progress').css({'left':cur+'%'});
        });
        Song.addEventListener('progress', function(){
            var
                load = Song.buffered.end(0);
            load = -((songs[id_song][3]-load)*100)/songs[id_song][3];
            $('.load').css({'left':load+'%'}, 100);
        });
    }


    function playPauseSong(id) {
        if ( Song ) {
            if ( id == id_song ) {
                if ( Song.paused ) {
                    Song.play();
                    Song.volume = volume;
                    $('.play-pause').css({'background-position':' #706f6a 8px -35px'});
                    $('.song#'+id+' .play-pause_song').css({'background-position':' #706f6a 4px -17px'});
                }
                else {
                    Song.pause();
                    $('.play-pause').css({'background-position':' #706f6a8 px 8px'});
                    $('.song#'+id+' .play-pause_song').css({'background-position':' #706f6a 4px 4px'});
                }
            }
            else {
                Song.pause();
                $('.play-pause_song').css({'background-position':' #706f6a 4px 4px'});
                $('.song#'+id+' .play-pause_song').css({'background-position':'#706f6a 4px -17px'});
                playNewSong(id);
            }
        }
        else {
            playNewSong(id);
        }
    }

    $( '.song, play-pause' ).on('click', function(){
       /* var id = Number($(this).attr('id'));*/
        var id = Number($(this).attr('id'));

        $('.play-pause_song').css({'background-position':' #706f6a 4px 4px'});
        playPauseSong(id);
        id++;
        $('.sledbtn#next').attr('data-id', id);
        id--;id--;
        $('.sledbtn#prev').attr('data-id', id);


       /* Song = new Audio(songs[id][2]);
        Song.play();*/
    });

    $('.sledbtn').on('click', function(){
        var
            id = $(this).attr('data-id');
        if (id != -1){
            $('.play-pause_song').css({'background-position':' #706f6a 4px 4px'});
            playPauseSong(id);
            id++;
            $('.sledbtn#next').attr('data-id', id);
            id--;id--;
            $('.sledbtn#prev').attr('data-id', id);
        }

        $('.mute').on('click', function(){
            if (Song){
                if (mute == false){
                    mute = true;
                    $('.mute').css({'color':'#c0392b'});
                    $('.volume').val(0);
                }
                else {
                    mute = false;
                    $('.mute').css({'color':'#ecf0f1'});
                    $('.volume').val(100);
                }
                Song.muted = mute;
            }
        });
    });

    $('.volume').on('change', function(){
        var
            val = $(this).val();
        if (Song){
            volume = val/100;
            Song.volume = volume;
            if (val == 0){
                mute = true;
                $('.mute').css({'color':'#C0392B'});
            }
            else if (val > 0){
                mute = false;
                $('.mute').css({'color':'#ECF0F1'});
            }
        }
    });


    $('.range').on('mouseenter', function(){
        if (Song) {
            var
                id = Number($('.play-pause').attr('id')),
                offset = $(this).offset(),
                dur = songs[id][3],
                w = $(this).width();
            $('.setTime').show();
            $('.range').on('mousemove', function(e){
                var
                    x = e.PageX - offset.left,
                    xproc = (x*100)/w,
                    sec = (xproc*dur)/100;
                $('.setTime').css({'left':x-10});
                $('.setTime').text(parseInt(sec/60)+':'+parseInt(sec%60));
                $('.range').on('click', function(){
                    xproc = xproc-100;
                    $('.progress').css({'left':xproc+'%'});
                    Song.currentTime = sec;
                });
            });
        }
    })

});