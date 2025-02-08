import {renderHook, act} from '@testing-library/react-hooks';
import {useDebounce} from '../useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should return the initial value immediately', () => {
    const {result} = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should debounce the value update', () => {
    const {result, rerender} = renderHook(
      ({value, delay}) => useDebounce(value, delay),
      {
        initialProps: {value: 'test', delay: 500},
      },
    );

    // İlk değer
    expect(result.current).toBe('test');

    // Değeri güncelle
    rerender({value: 'updated', delay: 500});

    // Zamanlayıcı tetiklenmeden önce eski değer
    expect(result.current).toBe('test');

    // Zamanlayıcıyı ilerlet
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Yeni değer
    expect(result.current).toBe('updated');
  });
}); 