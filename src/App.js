import React, { useState, useEffect } from 'react';
import mainCardMascotPng from './puri_static.png'; 

// Helper component for SVG icons to avoid repetition
const Icon = ({ path, className = "w-6 h-6", solid = false }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    // viewBox 속성 오류를 수정했습니다.
    viewBox="0 0 24 24" 
    fill={solid ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={1.5} 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// 메인 카드에 들어갈 PNG 마스코트 컴포넌트
const MainCardMascot = ({ className }) => (
  <img 
    
    src={mainCardMascotPng} 
    alt="Puri Mascot" 
    className={className} 
  />
);


// Countdown Timer Component
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const difference = tomorrow - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center">
          <div className="text-2xl sm:text-4xl font-bold text-white bg-white/10 rounded-lg p-2 sm:p-3 w-16 text-center">
            {formatTime(value)}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 uppercase mt-1">{interval}</div>
        </div>
      ))}
    </div>
  );
};

// Header Component
const Header = ({ onConnectWallet, isWalletConnected, navigateTo }) => (
  <header className="fixed top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-lg z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* 모바일 화면을 위해 헤더 높이를 h-16으로 줄이고, sm 이상에서는 h-20으로 조정 */}
      <div className="flex items-center justify-between h-16 sm:h-20">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('main')}>
          {/* 모바일 화면을 위해 로고 텍스트 크기를 text-2xl로 줄이고, sm 이상에서는 text-3xl로 조정 */}
          <span 
            className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500"
            style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
          >
            Puri
          </span>
        </div>
        {/* 모바일 화면을 위해 버튼 간 간격을 space-x-2로 줄이고, sm 이상에서는 space-x-4로 조정 */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* 모바일 화면에서 텍스트를 더 작게 조정합니다. */}
          <button onClick={() => navigateTo('feed')} className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm font-semibold">
            지구인 피드
          </button>
          <button onClick={() => navigateTo('history')} className="text-slate-300 hover:text-white transition-colors text-xs sm:text-sm font-semibold">
            미션 히스토리
          </button>
          <button
            onClick={onConnectWallet}
            // 모바일 화면을 위해 버튼 패딩과 텍스트 크기를 조정
            className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center space-x-2 ${
              isWalletConnected
                ? 'bg-green-400 text-slate-900'
                : 'bg-indigo-500 text-white hover:bg-indigo-400'
            }`}
          >
            <Icon path="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12v6.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V12zM12 13.5a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM12 3a.75.75 0 00-.75.75v6.75A.75.75 0 0012 10.5h.75a.75.75 0 000-1.5H12V3z" solid />
            <span className="hidden sm:inline">{isWalletConnected ? 'Connected' : 'Connect Wallet'}</span>
            <span className="sm:hidden">{isWalletConnected ? 'On' : 'Off'}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
);

// Mission Card Component
const MissionCard = ({ onParticipate }) => {
  const [copied, setCopied] = useState(false);
  const missionTitle = "가장 좋아하는 지구의 하늘 사진을 공유해주세요!";
  const missionDescription = "푸리가 지구의 다채로운 하늘을 보고 싶어해요. 여러분이 가장 아끼는 하늘 사진으로 푸리에게 지구의 아름다움을 알려주세요.";

  const handleShare = async (event) => {
    event.preventDefault();
    const shareData = {
        title: "Puri's Mission",
        text: `"${missionTitle}"\n\n푸리와 함께 미션에 참여하고 상금도 받아가세요!`,
        url: window.location.href
    };
    const fallbackToClipboard = () => {
        const missionText = `Puri's Mission: "${missionTitle}" 함께 참여하고 상금도 받아가세요! ${window.location.href}`;
        const textArea = document.createElement("textarea");
        textArea.value = missionText;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('클립보드 복사에 실패했습니다.', err);
        }
        document.body.removeChild(textArea);
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Web Share API failed, falling back to clipboard.', err);
            fallbackToClipboard();
        }
    } else {
        fallbackToClipboard();
    }
  };

  return (
    <div className="relative bg-slate-800/50 border border-slate-700 rounded-3xl p-6 sm:p-10 text-center shadow-2xl shadow-indigo-500/10 backdrop-blur-md w-full max-w-2xl mx-auto">
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <MainCardMascot className="w-40 h-40" />
      </div>
      <div className="mt-24">
          <h2 className="text-lg font-semibold text-green-400 uppercase tracking-widest">오늘의 미션</h2>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-2">"{missionTitle}"</p>
          <p className="text-slate-400 mt-3 max-w-md mx-auto">{missionDescription}</p>
      </div>
      <div className="my-8">
          <div className="text-sm text-slate-300 mb-2">총 상금</div>
          <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400">
              1,000,000 KRW
          </div>
      </div>
      <div className="my-8">
          <div className="text-sm text-slate-300 mb-3">미션 종료까지 남은 시간</div>
          <CountdownTimer />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onParticipate}
          className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 text-slate-900 font-bold py-3 px-10 rounded-full text-lg transition-transform duration-300 hover:scale-105"
        >
          미션 참여하기
        </button>
        <button 
          onClick={handleShare}
          className="w-full sm:w-auto bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <Icon path="M9 16V10H5L12 3L19 10H15V16H9M5 20V18H19V20H5Z" className="w-5 h-5" solid/>
          <span>{copied ? '복사 완료!' : '공유하기'}</span>
        </button>
      </div>
    </div>
  );
};

// Earthling Feed Component
const EarthlingFeed = ({ isSocialLoggedIn, onSocialLogin }) => {
    const initialFeedItems = [
        { id: 1, user: 'SkyLover', img: 'https://placehold.co/600x400/818cf8/ffffff?text=Sunset', likes: 123, isLiked: false },
        { id: 2, user: 'StarGazer', img: 'https://placehold.co/600x400/34d399/ffffff?text=Night+Sky', likes: 45, isLiked: false },
        { id: 3, user: 'CloudWatcher', img: 'https://placehold.co/600x400/60a5fa/ffffff?text=Clouds', likes: 88, isLiked: false },
        { id: 4, user: 'AstroKid', img: 'https://placehold.co/600x400/f472b6/ffffff?text=Aurora', likes: 210, isLiked: false },
        { id: 5, user: 'DawnPatrol', img: 'https://placehold.co/600x400/fb923c/ffffff?text=Sunrise', likes: 76, isLiked: false },
        { id: 6, user: 'BlueSkyDreamer', img: 'https://placehold.co/600x400/38bdf8/ffffff?text=Blue+Sky', likes: 152, isLiked: false },
    ];

    const [feedItems, setFeedItems] = useState(initialFeedItems);

    const handleLike = (id) => {
        if (!isSocialLoggedIn) return;

        setFeedItems(feedItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    isLiked: !item.isLiked,
                    likes: item.isLiked ? item.likes - 1 : item.likes + 1
                };
            }
            return item;
        }));
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-8">지구인 피드</h2>
            <div className="relative">
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${!isSocialLoggedIn ? 'blur-md' : ''}`}>
                    {feedItems.map(item => (
                        <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden group">
                            <img src={item.img} alt={`Feed from ${item.user}`} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-white font-semibold">@{item.user}</p>
                                    <button
                                        onClick={() => handleLike(item.id)}
                                        disabled={!isSocialLoggedIn}
                                        className="flex items-center space-x-1 text-slate-400 hover:text-red-500 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Icon 
                                            path="M11.645 20.91l-1.14-1.043C5.655 15.348 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.74 0 3.275.925 4.155 2.292A4.777 4.777 0 0116.5 3c2.786 0 5.25 2.322 5.25 5.25 0 3.924-3.405 7.098-8.255 11.617l-1.14 1.043a.75.75 0 01-1.06 0z" 
                                            className={`w-6 h-6 ${item.isLiked ? 'text-red-500' : ''}`}
                                            solid={item.isLiked}
                                        />
                                        <span className="font-medium">{item.likes}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!isSocialLoggedIn && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/70 rounded-2xl p-4 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">피드를 보려면 간편 로그인이 필요해요!</h3>
                        <p className="text-slate-300 mt-2 text-sm sm:text-base">푸리가 지구인들의 멋진 사진들을 모아놨어요.</p>
                        <div className="flex flex-col w-full max-w-xs sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                            <button onClick={onSocialLogin} className="w-full flex items-center justify-center px-6 py-3 bg-white text-slate-800 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.356-11.303-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.37,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                                Google로 시작하기
                            </button>
                             <button onClick={onSocialLogin} className="w-full flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors border border-gray-600">
                                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.809.023-.02-.023-.096-.023-.096s-1.023-.489-2.495-.466c-1.472.023-2.809.836-3.554 1.596-.745.76-1.268 1.738-1.268 2.94 0 1.036.466 2.162 1.234 2.885.768.723 1.826 1.18 2.94 1.18.976 0 1.668-.311 2.212-.623.544-.312.976-.85 1.126-1.332a.64.64 0 0 0-.023-.623ZM8.049 2.958c-1.49-.048-2.94.886-3.66 2.135-1.52 2.63-1.268 5.616.67 7.23.686.59 1.723.936 2.746.936.976 0 1.892-.372 2.58-.968.722-.613 1.268-1.636 1.268-2.82 0-1.08-.466-2.18-1.234-2.964-.745-.78-1.872-1.22-2.964-1.22-.048 0-.096 0-.144.023Z"/></svg>
                                Apple로 시작하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Mission History Component
const MissionHistory = () => {
    const pastMissions = [
        { date: '2025-08-27', mission: '"가장 편안함을 느끼는 장소를 보여줘!"', winner: 'CozyHome', img: 'https://placehold.co/600x400/f59e0b/ffffff?text=Cozy+Room' },
        { date: '2025-08-26', mission: '"지구에서 가장 맛있는 음식을 알려줘!"', winner: 'FoodieMaster', img: 'https://placehold.co/600x400/ef4444/ffffff?text=Pizza' },
        { date: '2025-08-25', mission: '"당신의 반려동물을 자랑해줘!"', winner: 'CatLover', img: 'https://placehold.co/600x400/22c55e/ffffff?text=Cute+Cat' },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-10">지난 미션 히스토리</h2>
            <div className="space-y-8">
                {pastMissions.map((item, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-grow">
                            <p className="text-sm text-slate-400">{item.date}</p>
                            <p className="text-xl font-bold text-white mt-1">{item.mission}</p>
                            <div className="mt-4 bg-green-500/10 text-green-300 text-sm font-semibold py-2 px-4 rounded-full inline-flex items-center">
                                <span>Best Submission by @{item.winner}</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 flex-shrink-0">
                            <img src={item.img} alt={`Mission winner from ${item.date}`} className="w-full h-40 object-cover rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Upcoming Missions Component
const UpcomingMissions = () => {
    const futureMissions = [
        { date: '2025-08-29', mission: '"당신이 가장 좋아하는 책의 한 구절을 공유해주세요."', prize: '500,000 KRW' },
        { date: '2025-08-30', mission: '"가장 평화로운 순간을 담은 사진을 보여주세요."', prize: '700,000 KRW' },
        { date: '2025-08-31', mission: '"지구의 밤하늘에서 가장 밝게 빛나는 별은 무엇인가요?"', prize: '1,200,000 KRW' },
        { date: '2025-09-01', mission: '"당신의 도시에서 가장 아름다운 건물을 소개해주세요."', prize: '800,000 KRW' },
        { date: '2025-09-02', mission: '"웃음을 주는 짧은 동영상을 만들어주세요."', prize: '1,500,000 KRW' },
        { date: '2025-09-03', mission: '"지구인들이 즐겨 듣는 음악을 푸리에게 추천해주세요."', prize: '600,000 KRW' },
    ];

    return (
        <div className="mt-12 w-full max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white text-center mb-6">앞으로 시작될 미션</h3>
            <div className="space-y-4">
                {futureMissions.map((item, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-grow">
                            <div className="text-center bg-slate-700/50 rounded-lg px-3 py-1 flex-shrink-0">
                                <p className="text-sm font-bold text-white">{new Date(item.date).getDate()}</p>
                                <p className="text-xs text-slate-400">{new Date(item.date).toLocaleString('ko-KR', { month: 'short' })}</p>
                            </div>
                            <p className="font-semibold text-white text-left">{item.mission}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">예정</span>
                            <span className="text-xs font-bold text-green-400">{item.prize}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Modal Component
const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto p-4 flex" onClick={onClose}>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md relative m-auto" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <Icon path="M6 18L18 6M6 6l12 12" />
            </button>
            {children}
        </div>
    </div>
);

// Participate Modal Content
const ParticipateModal = ({ onClose }) => {
    const [image, setImage] = useState(null);
    return (
        <div>
            <h3 className="text-2xl font-bold text-white text-center mb-6">미션 참여하기</h3>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">이미지 업로드</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <div className="flex text-sm text-slate-500"><label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-indigo-500 px-2"><span>파일 선택</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setImage(e.target.files[0])} /></label><p className="pl-1">또는 드래그 앤 드롭</p></div>
                            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                     {image && <p className="text-sm text-green-400 mt-2">선택된 파일: {image.name}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300">간단한 텍스트</label>
                    <textarea id="description" name="description" rows="3" className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-white"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">제출하기</button>
            </form>
        </div>
    );
};

// Custom Date Picker Component
const CustomDatePicker = ({ scheduledMissions, selectedDate, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();

    const daysInMonth = [];
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
        daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const blanks = Array(startDay).fill(null);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    
    const formatDate = (date) => date.toISOString().split('T')[0];

    return (
        <div className="bg-slate-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <button type="button" onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-600">&lt;</button>
                <div className="font-bold text-lg text-white">
                    {currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}
                </div>
                <button type="button" onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-600">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
                {daysInMonth.map(day => {
                    const dateString = formatDate(day);
                    const isPast = day < today;
                    const isScheduled = scheduledMissions.includes(dateString);
                    const isSelected = selectedDate === dateString;
                    const isDisabled = isPast || isScheduled;

                    let dayClass = "w-9 h-9 flex items-center justify-center rounded-full transition-colors ";
                    if (isDisabled) {
                        dayClass += "text-slate-500 cursor-not-allowed line-through";
                    } else if (isSelected) {
                        dayClass += "bg-indigo-500 text-white font-bold";
                    } else {
                        dayClass += "text-white hover:bg-slate-600 cursor-pointer";
                    }

                    return (
                        <button
                            type="button"
                            key={dateString}
                            disabled={isDisabled}
                            onClick={() => onDateSelect(dateString)}
                            className={dayClass}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


// Create Mission Modal Content
const CreateMissionModal = ({ onClose, onCreateMission, scheduledMissions }) => {
    const [date, setDate] = useState('');
    const [keyword, setKeyword] = useState('');
    const [missionContent, setMissionContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    const handleGenerateMission = async () => {
        if (!keyword) {
            alert("아이디어 생성을 위한 키워드를 입력해주세요.");
            return;
        }
        setIsGenerating(true);
        setMissionContent('');

        const apiKey = ""; // Leave this empty
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        const systemPrompt = "You are a friendly and curious alien mascot named Puri. Your goal is to understand Earthlings by giving them creative daily missions. Your tone is playful, inquisitive, and slightly quirky. Generate a mission prompt based on the user's keyword. The mission should be a single, engaging sentence, phrased as a request from you to the Earthlings. The response should be in Korean.";
        const userQuery = `Keyword: ${keyword}`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const result = await response.json();
            const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (generatedText) {
                setMissionContent(generatedText.replace(/"/g, '')); // Remove quotes
            } else {
                setMissionContent("아이디어 생성에 실패했어요. 다시 시도해주세요!");
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setMissionContent("오류가 발생했어요. 네트워크 연결을 확인해주세요.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!date || !missionContent) {
            alert("날짜와 미션 내용을 모두 입력해주세요.");
            return;
        };
        const missionData = {
            date: date,
            prize: e.target.prize.value,
            content: missionContent
        };
        onCreateMission(missionData);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-white text-center mb-6">새로운 미션 생성하기</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">미션 날짜 선택</label>
                    <CustomDatePicker 
                        scheduledMissions={scheduledMissions}
                        selectedDate={date}
                        onDateSelect={setDate}
                    />
                     {date && <p className="text-sm text-green-500 mt-2">선택된 날짜: {date}</p>}
                </div>
                 <div>
                    <label htmlFor="prize" className="block text-sm font-medium text-slate-300">총 상금 (KRW)</label>
                    <input type="number" id="prize" name="prize" required className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-white" />
                </div>
                <div>
                    <label htmlFor="keyword" className="block text-sm font-medium text-slate-300">미션 아이디어 키워드</label>
                    <div className="flex gap-2 mt-1">
                        <input type="text" id="keyword" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="예: 음식, 자연, 행복" className="block w-full rounded-md bg-slate-700 border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-white" />
                        <button type="button" onClick={handleGenerateMission} disabled={isGenerating} className="flex items-center justify-center px-4 py-2 rounded-md bg-green-500 text-slate-900 font-semibold hover:bg-green-400 transition-colors disabled:bg-slate-500">
                           {isGenerating ? '생성중...' : '✨ 생성'}
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-slate-300">미션 내용</label>
                    <textarea id="content" name="content" rows="3" required value={missionContent} onChange={(e) => setMissionContent(e.target.value)} placeholder={isGenerating ? '푸리가 열심히 미션을 만들고 있어요...' : '키워드를 입력하고 아이디어를 생성하거나 직접 입력해주세요.'} className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-white"></textarea>
                </div>
                <button type="submit" disabled={!date} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors">미션 생성하기</button>
            </form>
        </div>
    );
};


export default function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isSocialLoggedIn, setIsSocialLoggedIn] = useState(false);
  const [showConnectionMessage, setShowConnectionMessage] = useState(false);
  const [page, setPage] = useState('main'); // 'main', 'history', 'feed'
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [scheduledMissions, setScheduledMissions] = useState([
      '2025-08-29', '2025-08-30', '2025-08-31', '2025-09-01', '2025-09-02', '2025-09-03'
  ]);

  const handleConnectWallet = () => setIsWalletConnected(true);
  
  const handleParticipate = () => {
    if (!isWalletConnected) {
        setShowConnectionMessage(true);
        setTimeout(() => setShowConnectionMessage(false), 3000);
    } else {
        setShowParticipateModal(true);
    }
  };
  
  const handleSocialLogin = () => setIsSocialLoggedIn(true);
  const navigateTo = (pageName) => setPage(pageName);

  const handleCreateMission = (missionData) => {
      setScheduledMissions([...scheduledMissions, missionData.date]);
      setShowCreateModal(false);
      alert(`${missionData.date}에 새로운 미션이 성공적으로 생성되었습니다!`);
  };

  const renderPage = () => {
    switch(page) {
      case 'feed':
        return <EarthlingFeed isSocialLoggedIn={isSocialLoggedIn} onSocialLogin={handleSocialLogin} />;
      case 'history':
        return <MissionHistory />;
      case 'main':
      default:
        return (
          <>
            <MissionCard onParticipate={handleParticipate} />
            <div className="mt-12 w-full max-w-2xl mx-auto text-center">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white">푸리에게 새로운 미션을 제안해보세요!</h3>
                    <p className="text-slate-400 mt-2">하루에 한 명만 다음 미션을 만들 수 있어요. 지금 바로 도전해보세요.</p>
                    <button onClick={() => setShowCreateModal(true)} className="mt-4 bg-transparent hover:bg-green-500/10 border border-green-500 text-green-400 font-bold py-2 px-6 rounded-full transition-colors">
                        새로운 미션 제안하기
                    </button>
                </div>
            </div>
            <UpcomingMissions />
          </>
        );
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-600/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Header onConnectWallet={handleConnectWallet} isWalletConnected={isWalletConnected} navigateTo={navigateTo} />

      {/* 헤더 크기에 맞춰 메인 콘텐츠의 시작 위치를 반응형으로 조정합니다. */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 pb-20">
        <div className="flex flex-col items-center">
          {renderPage()}
        </div>
      </main>

      {showParticipateModal && <Modal onClose={() => setShowParticipateModal(false)}><ParticipateModal onClose={() => setShowParticipateModal(false)} /></Modal>}
      {showCreateModal && <Modal onClose={() => setShowCreateModal(false)}><CreateMissionModal onClose={() => setShowCreateModal(false)} onCreateMission={handleCreateMission} scheduledMissions={scheduledMissions} /></Modal>}

      {showConnectionMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
          미션에 참여하려면 지갑을 먼저 연결해주세요!
        </div>
      )}
    </div>
  );
}
