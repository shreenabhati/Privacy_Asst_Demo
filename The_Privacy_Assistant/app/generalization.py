# import os
# import sys
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def generalize_pii(text, identified_pii):
    modified_text = ''
    last_end = 0
    print("inside gen")
    print(identified_pii)
    for pii in identified_pii:
        modified_text += text[last_end:pii[1]]
        modified_text += f'<button id="acceptButton" class="accept" data-entity="{pii[0]}">{pii[0]}</button>'
        last_end = pii[2]
    modified_text += text[last_end:]
    return modified_text
