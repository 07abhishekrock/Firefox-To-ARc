export type TabRuntimeMessage = {
  id : 'YOUTUBE_MUSIC::TOGGLE_PLAY';
} | {
  id: 'YOUTUBE_MUSIC::PLAY_NEXT';
} | {
  id: 'YOUTUBE_MUSIC::PLAY_PREVIOUS';
} | {
  id: 'YOUTUBE_MUSIC::TOGGLE_PLAY_CALLBACK';
  paused: boolean;
} | {
  id: 'YOUTUBE_MUSIC::GET_LATEST_PLAYBACK';
} | {
  id: 'YOUTUBE_MUSIC::RECEIVE_LATEST_PLAYBACK';
  paused: boolean;
  title: string;
} | {
  id : 'YOUTUBE::TOGGLE_PLAY';
} | {
  id: 'YOUTUBE::PLAY_NEXT';
} | {
  id: 'YOUTUBE::PLAY_PREVIOUS';
} | {
  id: 'YOUTUBE::TOGGLE_PLAY_CALLBACK';
  paused: boolean;
} | {
  id: 'YOUTUBE::GET_LATEST_PLAYBACK';
} | {
  id: 'YOUTUBE::RECEIVE_LATEST_PLAYBACK';
  paused: boolean;
  title: string;
} | {
  id: 'GMEET:GET_LATEST_MUTE_STATUS';
  muted: boolean;
  title: string;
} | {
  id: 'GMEET:RECEIVE_LATEST_MUTE_STATUS';
  muted: boolean;
  title: string;
} | {
  id: 'GMEET:TOGGLE_MUTE_STATUS';
  muted: boolean;
}
