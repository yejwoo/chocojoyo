// context/AudioContext.js
"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState("/music/song/main-theme.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManualChange, setIsManualChange] = useState(false);

  // 트랙 변경 및 재생 함수 (0.5초 지연 후 트랙 변경)
  const changeTrack = (newTrack, withFade = false) => {
    if (withFade) {
      fadeOut(() => {
        setTimeout(() => {
          setCurrentTrack(newTrack);
          setIsPlaying(true);
        }, 500);
      });
    } else {
      setCurrentTrack(newTrack);
      setIsPlaying(true);
    }
  };

  // 재생 상태 관리
  const togglePlay = () => {
    setIsManualChange(true);
    setIsPlaying(prev => !prev);
  };

  // 트랙이나 재생 상태 변경 시 오디오 동기화
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
      if (isPlaying) {
        if (!isManualChange) {
          audio.volume = 0;
          audio.play()
            .then(() => fadeIn())
            .catch(err => console.log("Auto-play blocked:", err));
        } else {
          audio.volume = 1;
          audio.play().catch(err => console.log("Auto-play blocked:", err));
        }
      } else {
        if (!isManualChange) {
          fadeOut(() => audio.pause());
        } else {
          audio.pause();
        }
      }
    }
  }, [currentTrack, isPlaying]);

  // 페이드아웃 효과 (볼륨 점진적으로 줄이기)
  const fadeOut = (callback) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearInterval(audio.fadeInterval);
    audio.fadeInterval = setInterval(() => {
      if (audio.volume > 0.1) {
        audio.volume -= 0.1;
      } else {
        audio.volume = 0;
        clearInterval(audio.fadeInterval);
        if (callback) callback();
      }
    }, 100);
  };

  // 페이드인 효과 (볼륨 점진적으로 올리기)
  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearInterval(audio.fadeInterval);
    audio.fadeInterval = setInterval(() => {
      if (audio.volume < 0.9) {
        audio.volume += 0.1;
      } else {
        audio.volume = 1;
        clearInterval(audio.fadeInterval);
      }
    }, 100);
  };

  return (
    <AudioContext.Provider value={{ currentTrack, isPlaying, togglePlay, changeTrack }}>
      <audio ref={audioRef} src={currentTrack} preload="auto" loop />
      {children}
    </AudioContext.Provider>
  );
};
