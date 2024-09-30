// tests/ts/Pages/Example.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

const ExampleComponent = () => <div>Example Component</div>;

describe('Example Test', () => {
    it('should render the example component', () => {
        render(<ExampleComponent />);
        expect(screen.getByText('Example Component')).toBeInTheDocument();
    });
});
