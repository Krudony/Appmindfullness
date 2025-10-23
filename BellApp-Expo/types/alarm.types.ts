export interface Alarm {
  id: string;
  name: string;
  time: Date;
  sound: string;
  repeat: string[]; // ['monday', 'tuesday', ...]
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type AlarmSound = 'temple-bell' | 'morning-chant' | 'evening-chant' | 'meditation-bell' | 'custom';