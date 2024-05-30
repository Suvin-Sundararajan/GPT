import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const renderTextWithFormatting = (text) => {
    if (typeof text !== 'string') {
        console.error('Invalid text input:', text);
        return 'Invalid text'; // Provide a fallback or error message
    }
    const renderLatex = (latexContent) => {
        try {
            console.log('Original LaTeX:', latexContent); // Debug logging for the original input

            // Remove the first [ or ( and the last \] or \)
            if ((latexContent.startsWith('[') || latexContent.startsWith('(')) &&
                (latexContent.endsWith('\\]') || latexContent.endsWith('\\)'))) {
                latexContent = latexContent.slice(1, -2);
            }

            // Render the LaTeX content inline
            return katex.renderToString(latexContent, { throwOnError: false, displayMode: false });
        } catch (error) {
            console.error('Error rendering LaTeX:', latexContent, error); // Error handling
            return latexContent;
        }
    };

    const processText = (text) => {
        // Remove text between 【 and 】
        text = text.replace(/【.*?】/g, '');

        const parts = [];
        let buffer = '';
        let inBold = false;
        let inLatex = false;
        let partType = 'normal';
        let latexBuffer = ''; // To accumulate LaTeX content

        const latexStartRegex = /(\$\$|\\\[|\\\(|\$|\\begin\{matrix\}|\\begin\{pmatrix\})/;
        const latexEndRegex = /(\$\$|\\\]|\\\)|\$|\\end\{matrix\}|\\end\{pmatrix\})/;

        for (let i = 0; i < text.length; i++) {
            buffer += text[i];

            // Check for LaTeX start delimiters
            if (!inLatex && latexStartRegex.test(buffer)) {
                if (buffer.length > 1) {
                    parts.push({ type: partType, content: buffer.slice(0, -1) });
                    buffer = buffer.slice(-1);
                }
                if (parts.length > 0 && parts[parts.length - 1].content.endsWith('\\')) {
                    parts[parts.length - 1].content = parts[parts.length - 1].content.slice(0, -1);
                }
                inLatex = true;
                partType = 'latex';
                latexBuffer = buffer; // Start accumulating LaTeX content
                buffer = '';
                continue;
            }

            // Accumulate LaTeX content
            if (inLatex) {
                latexBuffer += text[i];
                if (latexEndRegex.test(latexBuffer)) {
                    inLatex = false;
                    parts.push({ type: partType, content: latexBuffer });
                    latexBuffer = '';
                    partType = 'normal';
                    buffer = ''; // Clear buffer to prevent re-processing the end delimiter
                    continue;
                }
                continue;
            }

            // Check for bold delimiters
            if (!inBold && buffer.endsWith('**')) {
                inBold = true;
                parts.push({ type: partType, content: buffer.slice(0, -2) });
                buffer = '';
                partType = 'bold';
                continue;
            } else if (inBold && buffer.endsWith('**')) {
                inBold = false;
                parts.push({ type: partType, content: buffer.slice(0, -2) });
                buffer = '';
                partType = 'normal';
                continue;
            }

            // Check for headers (###)
            if (!inLatex && buffer.endsWith('\n')) {
                if (buffer.startsWith('###')) {
                    parts.push({ type: 'header', content: buffer.slice(3).trim() });
                    buffer = '';
                    continue;
                }
            }

            // Check for new line
            if (buffer.endsWith('\n')) {
                if (inLatex) {
                    latexBuffer += buffer; // Add newline to latexBuffer if in LaTeX block
                    buffer = '';
                } else {
                    parts.push({ type: partType, content: buffer.slice(0, -1) });
                    parts.push({ type: 'newline' });
                    buffer = '';
                }
                continue;
            }
        }

        if (buffer) {
            parts.push({ type: partType, content: buffer });
        }

        console.log('Full text being processed:', parts); // Log the full string being processed
        return parts;
    };

    const renderPart = (part, index) => {
        let content = part.content;
        if (part.type === 'latex') {
            content = renderLatex(content);
        }

        switch (part.type) {
            case 'normal':
                return <span key={index} style={{ lineHeight: '1.5' }}>{content}</span>;
            case 'bold':
                return <b key={index} style={{ lineHeight: '1.5' }}>{content}</b>;
            case 'header':
                return (
                    <div key={index} style={{ textAlign: 'center', fontWeight: 'bold', lineHeight: '1.5' }}>
                        {content}
                    </div>
                );
            case 'latex':
                return <span key={index} style={{ lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: content }} />;
            case 'newline':
                return <br key={index} />;
            default:
                return content;
        }
    };

    const processedText = processText(text);

    return (
        <div style={{ display: 'inline' }}>
            {processedText.map((part, index) => renderPart(part, index))}
        </div>
    );
};

export default renderTextWithFormatting;
