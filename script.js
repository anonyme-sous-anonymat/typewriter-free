document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('text');
    const paper = document.getElementById('paper');
    const keySound = document.getElementById('keySound');
    const returnSound = document.getElementById('returnSound');
    const exportBtn = document.getElementById('export');

    let lineHeight = 24; // Doit correspondre à line-height en CSS

    textArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // Joue le son de retour chariot
            returnSound.play();

            // Anime le mouvement du papier (déplacement vers le haut)
            setTimeout(() => {
                paper.style.transform = `translateY(-${lineHeight}px)`;
                // Reset après animation pour accumuler (mais en réalité, on ajuste le scroll)
                setTimeout(() => {
                    textArea.scrollTop += lineHeight;
                    paper.style.transition = 'none';
                    paper.style.transform = 'translateY(0)';
                    setTimeout(() => {
                        paper.style.transition = 'transform 0.5s ease';
                    }, 10);
                }, 500);
            }, 0);
        } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
            // Joue le son pour les touches imprimables
            keySound.play();
        }
    });

    // Exporter le document
    exportBtn.addEventListener('click', () => {
        const text = textArea.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
