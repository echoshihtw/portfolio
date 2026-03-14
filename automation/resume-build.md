# Resume Build System

The resume is generated with **Pandoc**.

---

## Install Pandoc

Mac:

brew install pandoc

---

## Install LaTeX (for PDF)

brew install --cask mactex

---

## Build Command

npm run build-resume

---

## Example Pandoc Commands

Generate HTML:

pandoc content/resume.md -o output/resume.html

Generate PDF:

pandoc content/resume.md \
-o output/resume.pdf \
--pdf-engine=xelatex

---

## Notes

If LaTeX is missing, HTML will still generate successfully.