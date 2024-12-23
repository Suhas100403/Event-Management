export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  created_at: string;
}

export interface Attendee {
  id: number;
  name: string;
  email: string;
  event_id: number;
  created_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  event_id: number;
  assignee_id: number;
  assignee_name?: string;
  created_at: string;
}