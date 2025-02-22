$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        playRepeatButton = $("#play-repeat"),
        openMenu = $('#play-menu'),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;

	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

	var songs = [{
		artist: "Lương Minh Trang",
		name: "Hạnh Phúc Đó Em Không Có - Lofi ",
		url: "Musics/HanhPhucDoEmKhongCo.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Doãn Hiếu",
		name: "Họ Yêu Ai Mất Rồi ",
		url: "Musics/HoYeuAiMatRoi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Tino",
		name: "Ừ Có Anh Đây",
		url: "Musics/ucoanhday.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Phát Hồ x JokeS Bii ft DinhLong",
		name: "Cố Giang Tình (Orinn Remix)",
		url: "Musics/CoGiangTinh.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Phát Hồ x JokeS Bii",
		name: "Họa Mây (DinhLong Remix)",
		url: "Musics/hoamay.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "OBITO x BIG H",
		name: "Thanh Âm Buồn Bã",
		url: "Musics/thanhambuonba.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Bảo Jen ft Tunny  DuyNh",
		name: "Cố Nhân (Cover)",
		url: "Musics/conhan.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: " Mạc Khiếu Tỷ Tỷ",
		name: "Kiếp Sau Không Chắc Sẽ Còn Gặp Được Anh",
		url: "Musics/kiepsaukhongchacsecongapduocanh.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: " Ngải Thần",
		name: "Thời Không Sai Lệch (Remix)",
		url: "Musics/thoikhongsailech.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Tưởng Tuyết Nhi ",
		name: "Yến Vô Hiết (Remix)",
		url: "Musics/yenvohiet.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Chi Pu",
		name: "Em Sai Rồi Anh Xin Lỗi Em Đi",
		url: "Musics/esraxled.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "B Ray",
		name: "Ex's Hate Me",
		url: "Musics/ex.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Sơn Tùng MTP",
		name: "Lạc Trôi (Triple D remix)",
		url: "Musics/LacTroi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Emily",
		name: "Xin Anh Đừng",
		url: "Musics/XinAnhDung.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Chipu",
		name: "Anh Ơi Ở Lại",
		url: "Musics/AnhOiOLai.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Đạt G",
		name: "Khó vẽ nụ cười",
		url: "Musics/KhoVeNuCuoi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Dig Didzay",
		name: "Nếu Anh Đi (Cover)",
		url: "Musics/NeuAnhDi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Hà My",
		name: "Anh Ta Bỏ Em Rồi - Cover",
		url: "Musics/AnhTaBoEmRoi.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Trịnh Đình Quang",
		name: "Thất tình",
		url: "Musics/ThatTinh.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Thanh Goll",
		name: "Cafe Đắng Và Mưa (Acoustic Cover)",
		url: "Musics/CFDangVaMua.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Minh Vương",
		name: "Đừng làm anh đau",
		url: "Musics/DungLamAnhDau.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Thanh Goll",
		name: "Cánh Chim Hải Âu (Acoustic Cover)",
		url: "Musics/CanhChimHaiAu.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Minh Vương",
		name: "Nỗi đau xót xa",
		url: "Musics/NoiDauXotXa.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Minh Vương",
		name: "Em ơi lên phố",
		url: "Musics/EmOiLenPho.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Thanh Goll",
		name: "Đêm Trăng Tình Yêu (Acoustic Cover)",
		url: "Musics/DemTrangTinhYeu.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Hoàng Yến Chibi",
		name: "Ngồi Bên Em",
		url: "Musics/NgoiBenEm.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "B Ray",
		name: "Cao Ốc 20",
		url: "Musics/CaoOc20.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "HKT",
		name: "Mặt Trái Của Sự Thật",
		url: "Musics/MatTraiCuaSuThat.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Thương Võ",
		name: "Còn gì đau hơn chữ đã từng (Cover)",
		url: "Musics/ConGiDauHonChuDaTung.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Đinh Tùng Huy",
		name: "Cứ Ngỡ Là Anh",
		url: "Musics/CuNgoLaAnh.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Quang Vinh, Bảo Thy ",
		name: "Ngôi Nhà Hoa Hồng",
		url: "Musics/NgoiNhaHoaHong.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Thanh Hưng",
		name: "Đúng Người Đúng Thời Điểm",
		url: "Musics/DungNguoiDungThoiDiem.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Hương Tràm",
		name: "Em gái mưa",
		url: "Musics/EmGaiMua.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Lê Thúy Chi",
		name: "Tình Yêu Mang Theo (Cover)",
		url: "Musics/TinhYeuMangTheo.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Hương Tràm",
		name: "Duyên Mình Lỡ",
		url: "Musics/DuyenMinhLo.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Đức Phúc",
		name: "Hết Thương Cạn Nhớ",
		url: "Musics/HetThuongCanNho.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Mr Siro",
		name: "Một Bước Yêu Vạn Dặm Đau",
		url: "Musics/MotBuocYeuVanDamDau.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Hiền Hồ",
		name: "Rồi Người Thương Cũng Hóa Người Dưng",
		url: "Musics/RoiNguoiThuongCungHoaNguoiDung.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Khánh Ngọc, Nhật Tinh Anh ",
		name: "Vầng Trăng Khóc",
		url: "Musics/VangTrangKhoc.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	},{
		artist: "Phạm Hồng Phước ",
		name: "Khi Người Lớn Cô Đơn",
		url: "Musics/KhiNguoiLonCoDon.mp3",
		picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
	}];
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	// songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    // toggle repeat
    function playRepeat()
    {
        isRepeat = !isRepeat;
        audio.loop = isRepeat;
        toggleEnable(isRepeat, playRepeatButton);
    }

    function toggleEnable(condition, element)
    {
        if (condition)
            element.addClass('isEnabled');
        else
            element.removeClass('isEnabled');
    }

    function toggleMenu()
    {
        isOpen = !isOpen;
        toggleEnable(isOpen, openMenu);
    }

	function showHover(event)
	{
		seekBarPos = sArea.offset();
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());

		sHover.width(seekT);

		cM = seekLoc / 60;

		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;

        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;

		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;

        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);

		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);

	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);
    }

    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);

		playProgress = (audio.currentTime / audio.duration) * 100;

		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;

		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;

        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);

        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);

        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


		seekBar.width(playProgress+'%');

		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }

    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        {
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag, index = null)
    {
        if (index === null) {
            if( flag == 0 || flag == 1 ) {
                ++currIndex;
            } else if (flag === -1) {
                --currIndex;
            }
        } else {
            currIndex = index;
        }

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
            $('.song').removeClass('playingSong');
            $('#song' + currIndex).addClass('playingSong');
        }
        else
        {
            if (currIndex < 0) {
                currIndex = songs.length - 1;
            } else if (currIndex > songs.length - 1) {
                currIndex = 0;
            }
            selectTrack(2);
        }
    }

    function initPlayer()
	{
        audio = new Audio();
        addSongList();
		selectTrack(0);

		audio.loop = false;
        isRepeat = false;
        isOpen = false;

		playPauseButton.on('click',playPause);

		sArea.mousemove(function(event){ showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click',playFromClickedPos);

        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){
            selectTrack(-1);
        });
        playNextTrackButton.on('click',function(){
            selectTrack(1);
        });
        playRepeatButton.on('click', function(){
            playRepeat();
        });
        openMenu.on('click', function(){
            $("#list-song").fadeToggle(300);
            toggleMenu();
        });
    }

    function addSongList() {
        songs.forEach((song, index) => {
            const songTemplate =
            `<div class="song" id="song${index}">
                <i class="fas fa-play"></i>
                <div class="info">
                    ${song.name} - ${song.artist}
                </div>
            </div>`

            $("#list-song").append(songTemplate);
            $('#song' + index).on('click', () => {
                selectTrack(0, index);
                playPause();
            });
        })

    }

	initPlayer();
});
