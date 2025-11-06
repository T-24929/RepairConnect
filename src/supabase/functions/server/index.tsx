import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

// Get all mechanics
app.get('/make-server-d3fbde8b/mechanics', async (c) => {
  try {
    const mechanics = await kv.getByPrefix('mechanic:');
    return c.json({ success: true, mechanics });
  } catch (error) {
    console.log('Error fetching mechanics:', error);
    return c.json({ success: false, error: 'Failed to fetch mechanics' }, 500);
  }
});

// Create a booking
app.post('/make-server-d3fbde8b/bookings', async (c) => {
  try {
    const body = await c.req.json();
    const bookingId = `booking:${Date.now()}`;
    
    const booking = {
      id: bookingId,
      mechanicId: body.mechanicId,
      service: body.service,
      date: body.date,
      time: body.time,
      vehicle: body.vehicle,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    await kv.set(bookingId, booking);
    
    return c.json({ success: true, booking });
  } catch (error) {
    console.log('Error creating booking:', error);
    return c.json({ success: false, error: 'Failed to create booking' }, 500);
  }
});

// Get booking by ID
app.get('/make-server-d3fbde8b/bookings/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const booking = await kv.get(`booking:${id}`);
    
    if (!booking) {
      return c.json({ success: false, error: 'Booking not found' }, 404);
    }
    
    return c.json({ success: true, booking });
  } catch (error) {
    console.log('Error fetching booking:', error);
    return c.json({ success: false, error: 'Failed to fetch booking' }, 500);
  }
});

// Update booking status (for tracking)
app.patch('/make-server-d3fbde8b/bookings/:id/status', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const booking = await kv.get(`booking:${id}`);
    if (!booking) {
      return c.json({ success: false, error: 'Booking not found' }, 404);
    }
    
    const updatedBooking = {
      ...booking,
      status: body.status,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`booking:${id}`, updatedBooking);
    
    return c.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.log('Error updating booking status:', error);
    return c.json({ success: false, error: 'Failed to update booking' }, 500);
  }
});

// Get chat messages for a booking
app.get('/make-server-d3fbde8b/chat/:bookingId', async (c) => {
  try {
    const bookingId = c.req.param('bookingId');
    const messages = await kv.getByPrefix(`chat:${bookingId}:`);
    
    return c.json({ success: true, messages });
  } catch (error) {
    console.log('Error fetching chat messages:', error);
    return c.json({ success: false, error: 'Failed to fetch messages' }, 500);
  }
});

// Send a chat message
app.post('/make-server-d3fbde8b/chat/:bookingId', async (c) => {
  try {
    const bookingId = c.req.param('bookingId');
    const body = await c.req.json();
    
    const messageId = `chat:${bookingId}:${Date.now()}`;
    const message = {
      id: messageId,
      bookingId,
      sender: body.sender,
      text: body.text,
      timestamp: new Date().toISOString()
    };
    
    await kv.set(messageId, message);
    
    return c.json({ success: true, message });
  } catch (error) {
    console.log('Error sending message:', error);
    return c.json({ success: false, error: 'Failed to send message' }, 500);
  }
});

// Submit a rating
app.post('/make-server-d3fbde8b/ratings', async (c) => {
  try {
    const body = await c.req.json();
    const ratingId = `rating:${Date.now()}`;
    
    const rating = {
      id: ratingId,
      mechanicId: body.mechanicId,
      bookingId: body.bookingId,
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(ratingId, rating);
    
    return c.json({ success: true, rating });
  } catch (error) {
    console.log('Error submitting rating:', error);
    return c.json({ success: false, error: 'Failed to submit rating' }, 500);
  }
});

// Get ratings for a mechanic
app.get('/make-server-d3fbde8b/mechanics/:mechanicId/ratings', async (c) => {
  try {
    const mechanicId = c.req.param('mechanicId');
    const allRatings = await kv.getByPrefix('rating:');
    
    // Filter ratings for this mechanic
    const mechanicRatings = allRatings.filter((r: any) => r.mechanicId === mechanicId);
    
    return c.json({ success: true, ratings: mechanicRatings });
  } catch (error) {
    console.log('Error fetching ratings:', error);
    return c.json({ success: false, error: 'Failed to fetch ratings' }, 500);
  }
});

// Health check
app.get('/make-server-d3fbde8b/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
