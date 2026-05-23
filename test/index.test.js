/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
  initializeDOMInteractions
} = require('../index');

const htmlPath = path.resolve(__dirname, '../index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

describe('DOM Testing Lab', () => {
  beforeEach(() => {
    // This requires the 'jsdom' environment to exist
    document.documentElement.innerHTML = html.toString();
    initializeDOMInteractions();
  });

  test('addElementToDOM adds content to the correct DOM element', () => {
    const containerId = 'dynamic-content';
    const content = 'Test Content';
    addElementToDOM(containerId, content);
    const container = document.getElementById(containerId);
    expect(container.innerHTML).toBe(content);
  });

  test('removeElementFromDOM removes an existing element from the DOM', () => {
    const elementId = 'simulate-click';
    expect(document.getElementById(elementId)).not.toBeNull();
    removeElementFromDOM(elementId);
    expect(document.getElementById(elementId)).toBeNull();
  });

  test('simulateClick updates the DOM with the expected content', () => {
    const containerId = 'dynamic-content';
    const content = 'Button Clicked!';
    simulateClick(containerId, content);
    const container = document.getElementById(containerId);
    expect(container.innerHTML).toBe(content);
  });

  test('handleFormSubmit updates the page when the form input contains valid text', () => {
    const input = document.getElementById('user-input');
    const container = document.getElementById('dynamic-content');
    const errorMessage = document.getElementById('error-message');
    
    input.value = 'Valid Submission';
    handleFormSubmit('user-form', 'dynamic-content');
    
    expect(container.innerHTML).toBe('Valid Submission');
    expect(errorMessage.classList.contains('hidden')).toBe(true);
  });

  test('handleFormSubmit displays the error message "Input cannot be empty" when the input is empty', () => {
    const input = document.getElementById('user-input');
    const errorMessage = document.getElementById('error-message');
    
    input.value = ''; // Empty input
    handleFormSubmit('user-form', 'dynamic-content');
    
    expect(errorMessage.textContent).toBe('Input cannot be empty');
    expect(errorMessage.classList.contains('hidden')).toBe(false);
  });
});