// Test script for Hindu Deities and Scriptures App
// This file contains test cases to verify all features and functionality

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import CardSystem from './components/CardSystem';
import CardStack from './components/CardStack';
import { AnimationFramework, TouchGestureHandler } from './components/GestureHandler';

describe('Hindu Deities and Scriptures App Tests', () => {
  // App Component Tests
  describe('App Component', () => {
    test('renders main title', () => {
      render(<App />);
      const titleElement = screen.getByText(/Sanatana Dharma Explorer/i);
      expect(titleElement).toBeInTheDocument();
    });

    test('toggles dark mode', () => {
      render(<App />);
      const darkModeButton = screen.getByLabelText(/Switch to dark mode/i);
      fireEvent.click(darkModeButton);
      // Check if dark mode class is applied
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('toggles audio narration', () => {
      render(<App />);
      const audioButton = screen.getByLabelText(/Enable audio narration/i);
      fireEvent.click(audioButton);
      // Check if audio icon changes
      const disableAudioButton = screen.getByLabelText(/Disable audio narration/i);
      expect(disableAudioButton).toBeInTheDocument();
    });

    test('toggles spiritual tools panel', () => {
      render(<App />);
      const spiritualToolsButton = screen.getByLabelText(/Toggle spiritual tools/i);
      fireEvent.click(spiritualToolsButton);
      // Check if spiritual tools panel is visible
      const spiritualToolsHeading = screen.getByText(/Spiritual Tools/i);
      expect(spiritualToolsHeading).toBeInTheDocument();
    });
  });

  // CardSystem Component Tests
  describe('CardSystem Component', () => {
    test('renders category tabs', async () => {
      render(<CardSystem />);
      // Wait for data to load
      const trimurtiTab = await screen.findByText(/Trimurti/i);
      expect(trimurtiTab).toBeInTheDocument();
    });

    test('changes active category on tab click', async () => {
      render(<CardSystem />);
      // Wait for data to load
      const trideviTab = await screen.findByText(/Tridevi/i);
      fireEvent.click(trideviTab);
      // Check if Tridevi category is active
      const lakshmiCard = await screen.findByText(/Lakshmi/i);
      expect(lakshmiCard).toBeInTheDocument();
    });

    test('filters cards based on search term', async () => {
      render(<CardSystem />);
      // Wait for data to load
      const searchInput = await screen.findByPlaceholderText(/Search deities, scriptures/i);
      fireEvent.change(searchInput, { target: { value: 'vishnu' } });
      // Check if only Vishnu card is displayed
      const vishnuCard = await screen.findByText(/Vishnu/i);
      expect(vishnuCard).toBeInTheDocument();
      // Other cards should not be visible
      const shivaCard = screen.queryByText(/Shiva/i);
      expect(shivaCard).not.toBeInTheDocument();
    });
  });

  // CardStack Component Tests
  describe('CardStack Component', () => {
    const mockCards = [
      {
        id: 'card1',
        title: 'Test Card 1',
        subtitle: 'Subtitle 1',
        content: 'Content 1',
        details: ['Detail 1', 'Detail 2'],
        animation: 'test'
      },
      {
        id: 'card2',
        title: 'Test Card 2',
        subtitle: 'Subtitle 2',
        content: 'Content 2',
        details: ['Detail 3', 'Detail 4'],
        animation: 'test'
      }
    ];

    test('renders card title and content', () => {
      render(<CardStack cards={mockCards} category="Test Category" />);
      expect(screen.getByText(/Test Card 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Content 1/i)).toBeInTheDocument();
    });

    test('navigates to next card on button click', () => {
      render(<CardStack cards={mockCards} category="Test Category" />);
      const nextButton = screen.getByLabelText(/Next card/i);
      fireEvent.click(nextButton);
      expect(screen.getByText(/Test Card 2/i)).toBeInTheDocument();
    });

    test('navigates to previous card on button click', () => {
      render(<CardStack cards={mockCards} category="Test Category" />);
      const nextButton = screen.getByLabelText(/Next card/i);
      fireEvent.click(nextButton);
      const prevButton = screen.getByLabelText(/Previous card/i);
      fireEvent.click(prevButton);
      expect(screen.getByText(/Test Card 1/i)).toBeInTheDocument();
    });

    test('toggles details view on button click', () => {
      render(<CardStack cards={mockCards} category="Test Category" />);
      const detailsButton = screen.getByLabelText(/Show details/i);
      fireEvent.click(detailsButton);
      expect(screen.getByText(/Detail 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Detail 2/i)).toBeInTheDocument();
    });
  });

  // Animation Framework Tests
  describe('Animation Framework', () => {
    test('renders deity animations', () => {
      render(<AnimationFramework type="shiva" category="deity" />);
      // Check if animation container is rendered
      const animationContainer = screen.getByRole('presentation');
      expect(animationContainer).toBeInTheDocument();
    });

    test('renders scripture animations', () => {
      render(<AnimationFramework type="vedas" category="scripture" />);
      // Check if animation container is rendered
      const animationContainer = screen.getByRole('presentation');
      expect(animationContainer).toBeInTheDocument();
    });
  });

  // Touch Gesture Handler Tests
  describe('Touch Gesture Handler', () => {
    test('handles swipe left gesture', () => {
      const mockSwipeLeft = jest.fn();
      render(
        <TouchGestureHandler onSwipeLeft={mockSwipeLeft}>
          <div>Swipe me</div>
        </TouchGestureHandler>
      );
      
      const element = screen.getByText(/Swipe me/i);
      
      // Simulate touch start
      fireEvent.touchStart(element, { 
        targetTouches: [{ clientX: 100, clientY: 100 }] 
      });
      
      // Simulate touch move
      fireEvent.touchMove(element, { 
        targetTouches: [{ clientX: 20, clientY: 100 }] 
      });
      
      // Simulate touch end
      fireEvent.touchEnd(element);
      
      expect(mockSwipeLeft).toHaveBeenCalled();
    });

    test('handles swipe right gesture', () => {
      const mockSwipeRight = jest.fn();
      render(
        <TouchGestureHandler onSwipeRight={mockSwipeRight}>
          <div>Swipe me</div>
        </TouchGestureHandler>
      );
      
      const element = screen.getByText(/Swipe me/i);
      
      // Simulate touch start
      fireEvent.touchStart(element, { 
        targetTouches: [{ clientX: 100, clientY: 100 }] 
      });
      
      // Simulate touch move
      fireEvent.touchMove(element, { 
        targetTouches: [{ clientX: 200, clientY: 100 }] 
      });
      
      // Simulate touch end
      fireEvent.touchEnd(element);
      
      expect(mockSwipeRight).toHaveBeenCalled();
    });
  });

  // Responsiveness Tests
  describe('Responsiveness', () => {
    test('adapts to mobile viewport', () => {
      // Set viewport to mobile size
      global.innerWidth = 375;
      global.innerHeight = 667;
      global.dispatchEvent(new Event('resize'));
      
      render(<App />);
      // Check if mobile layout is applied
      const appContainer = document.querySelector('div');
      expect(appContainer).toHaveStyle('min-height: 100vh');
    });

    test('adapts to tablet viewport', () => {
      // Set viewport to tablet size
      global.innerWidth = 768;
      global.innerHeight = 1024;
      global.dispatchEvent(new Event('resize'));
      
      render(<App />);
      // Check if tablet layout is applied
      const appContainer = document.querySelector('div');
      expect(appContainer).toHaveStyle('min-height: 100vh');
    });

    test('adapts to desktop viewport', () => {
      // Set viewport to desktop size
      global.innerWidth = 1440;
      global.innerHeight = 900;
      global.dispatchEvent(new Event('resize'));
      
      render(<App />);
      // Check if desktop layout is applied
      const appContainer = document.querySelector('div');
      expect(appContainer).toHaveStyle('min-height: 100vh');
    });
  });
});
