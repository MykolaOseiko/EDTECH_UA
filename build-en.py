"""Regenerate English pages after editing Ukrainian content or translations."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent
translations = json.loads((root / 'en-translations.json').read_text(encoding='utf-8'))
pattern = re.compile('|'.join(re.escape(key) for key in sorted(translations, key=len, reverse=True)))
for source, target in [('index.html', 'en.html'), ('showcases.html', 'showcases-en.html')]:
    text = (root / source).read_text(encoding='utf-8')
    text = pattern.sub(lambda match: translations[match.group()], text)
    text = text.replace('lang="uk"', 'lang="en"')
    text = text.replace('href="showcases.html"', 'href="showcases-en.html"')
    if source == 'showcases.html':
        text = text.replace('index.html#solutions', 'en.html#solutions')
    text = text.replace('href="index.html" lang="uk" hreflang="uk" aria-current="page"', 'href="index.html" lang="uk" hreflang="uk"')
    text = text.replace('href="en.html" lang="en" hreflang="en"', 'href="en.html" lang="en" hreflang="en" aria-current="page"')
    remaining = re.findall(r'[^<>\n]*[А-Яа-яІіЇїЄєҐґ][^<>\n]*', text)
    if remaining:
        raise ValueError(f'Untranslated content in {target}: {remaining}')
    (root / target).write_text(text, encoding='utf-8')
