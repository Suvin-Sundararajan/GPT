import React from 'react';
import './OverlayCard.css'; // Ensure this path is correct

const topics = [
    {
        topic: "Topic 1: Algebra and Geometry of Complex Numbers",
        outcomes: [
            "1.1 Learn to manipulate complex numbers: addition, subtraction, multiplication, and division.",
            "1.2 Learn the geometrical interpretation of complex numbers and the polar representation.",
            "1.3 Interpret the basic operations in 1 using geometrical ideas.",
            "1.4 Understand the algebraic and geometric meaning of complex conjugates.",
            "1.5 Understand the geometry and algebra associated with Euler's formula.",
            "1.6 Use 1.1-1.4 to calculate the nth roots of identity, and simple power functions."
        ]
    },
    {
        topic: "Topic 2: Functions of a Complex Variable",
        outcomes: [
            "2.1 Learn to generalize from real-valued functions to complex-valued functions.",
            "2.2 Learn the notion of continuity and limits.",
            "2.3 Learn to visualize complex-valued functions.",
            "2.4 Understand branch points and branch cuts.",
            "2.5 Characterize elementary functions - linear, polynomials, rational functions, exponential, trigonometric, and logarithmic functions."
        ]
    },
    {
        topic: "Topic 3: Differentiation of Complex-Valued Functions",
        outcomes: [
            "3.1 Understand the notion of analyticity - single-valuedness and differentiability.",
            "3.2 Understand the Cauchy-Riemann equations and their geometric interpretation.",
            "3.3 Understand Wirtinger derivatives and their interpretation.",
            "3.4 Understand harmonic functions and simple physical interpretation.",
            "3.5 Apply Cauchy-Riemann equations and Wirtinger derivatives on examples."
        ]
    },
    {
        topic: "Topic 4: Integration of Complex-Valued Functions",
        outcomes: [
            "4.1 Understand contour integrals as a generalization of line integrals in real-variable calculus.",
            "4.2 Understand the idea of path independence of integrals.",
            "4.3 Understand Cauchy's integral theorem and formula and their geometric significance.",
            "4.4 Apply Cauchy's integral formula."
        ]
    },
    {
        topic: "Topic 5: Power Series and Residue Theory",
        outcomes: [
            "5.1 Understand Laurent series as a generalization of Taylor series.",
            "5.2 Understand singularities in power series expansions.",
            "5.3 Understand residue theory and contour integration.",
            "5.4 Understand Jordan's Lemma and behavior at infinity.",
            "5.5 Deploy Laurent series, singularities, residue theory, and Jordan's Lemma to calculate real-valued integrals."
        ]
    },
    {
        topic: "Topic 6: Conformal Maps",
        outcomes: [
            "6.1 Understand the geometry of conformal maps.",
            "6.2 Understand the Riemann sphere.",
            "6.3 Understand Mobius transformations.",
            "6.4 Qualitatively understand the Riemann mapping theorem.",
            "6.5 Apply conformal maps, the Riemann sphere, and Mobius transformations to morphometry and anamorphosis."
        ]
    },
    {
        topic: "Topic 7: Applications of Complex Analysis",
        outcomes: [
            "7.1 Apply complex analysis in engineering problems.",
            "7.2 Use complex analysis in fluid dynamics.",
            "7.3 Explore other applications in physics and engineering."
        ]
    },
    {
        topic: "Topic 8: Fourier Series",
        outcomes: [
            "8.1 Understand Fourier's series.",
            "8.2 Calculate Fourier series expansions of periodic functions.",
            "8.3 Understand orthogonality, completeness, and convergence of Fourier series.",
            "8.4 Understand the Wilbraham-Gibbs phenomenon."
        ]
    },
    {
        topic: "Topic 9: Fourier Transforms",
        outcomes: [
            "9.1 Understand the definition and calculation of Fourier and Inverse Fourier transforms.",
            "9.2 Calculate Fourier transforms of delta and step functions.",
            "9.3 Understand the links to residue theory and complex analysis.",
            "9.4 Characterize properties of Fourier transforms - duality, linearity, modulation, shift, Parseval's identity, etc.",
            "9.5 Qualitatively understand the uncertainty relation and time-frequency tradeoff."
        ]
    },
    {
        topic: "Topic 10: Signal Processing Fundamentals",
        outcomes: [
            "10.1 Grapple with the question of how to process signals - sampling, deconstruction, compression, comparison, filtering, construction.",
            "10.2 Understand Nyquist and Shannon theorems for sampling.",
            "10.3 Understand convolution and filtering."
        ]
    },
    {
        topic: "Topic 11: Fast Fourier Transforms and Signal Processing",
        outcomes: [
            "11.1 Compute Fourier transform using FFT.",
            "11.2 Understand time-frequency uncertainty in discrete settings.",
            "11.3 Understand algorithms for FFT.",
            "11.4 Deploy FFT algorithms for music analysis.",
            "11.5 Understand the limits of Fourier analysis - time-frequency uncertainty principle and its consequences."
        ]
    },
    {
        topic: "Topic 12: Filters and Signal Processing",
        outcomes: [
            "12.1 Understand low-pass and high-pass filters."
        ]
    }
];

function OverlayCard({ onClose }) {
    return (
        <div className="overlay-card">
            <div className="overlay-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Course Learning Outcomes</h2>
                {topics.map((topic, index) => (
                    <div key={index} className="topic-section">
                        <h3>{topic.topic}</h3>
                        <ul className="outcomes-list">
                            {topic.outcomes.map((outcome, idx) => (
                                <li key={idx}>{outcome}</li>
                            ))}
                        </ul>
                        <div className="placeholder-buttons">
                            <button className="placeholder-button">Icon 1</button>
                            <button className="placeholder-button">Icon 2</button>
                            <button className="placeholder-button">Icon 3</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverlayCard;
