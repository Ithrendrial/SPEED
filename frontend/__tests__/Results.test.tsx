import { render, screen } from '@testing-library/react'
import Results from '@/app/results/page'

describe('Results page', () => {
    it('should have "Result" title text', () => {
        render(<Results />)

        const titleElem = screen.getByText('SEARCH RESULTS')

        expect(titleElem).toBeInTheDocument()
    })
})