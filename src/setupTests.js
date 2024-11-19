// src/setupTests.js
import '@testing-library/jest-dom';

// Mock canvas
class MockCanvas {
  getContext() {
    return {
      fillStyle: '',
      fillRect: () => {},
      drawImage: () => {},
      getImageData: () => ({
        data: new Uint8ClampedArray(0),
      }),
      putImageData: () => {},
      createImageData: () => {},
      setTransform: () => {},
      drawFocus: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fill: () => {},
      rect: () => {},
      arc: () => {},
    };
  }
}

// Setup canvas mock
global.HTMLCanvasElement.prototype.getContext = function() {
  return new MockCanvas().getContext();
};

// Mock react-lottie
jest.mock('react-lottie');