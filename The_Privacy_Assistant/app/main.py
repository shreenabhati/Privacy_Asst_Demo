
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, render_template, request
from app.generalization import generalize_pii
import spacy

nlp = spacy.load('en_core_web_sm')
nlp.disable_pipe('ner')

app = Flask(__name__)

#app = create_app() #Flask object creted in the __init__ file ( create function)


def identify_pii(text):
    doc = nlp(text)
    for token in doc:
        print(token.text,token.pos_)
    # print(doc)
    print("INSIDE identify_pii")
    # print(doc)
    #Debug Print
    for ent in doc.ents:
        print(ent.text, ent.start_char, ent.end_char, ent.label_)
    # print(list(doc.ents))
    identified_pii = []
    for ent in doc.ents:
        if ent.label_ in ['PERSON', 'ORG', 'DATE', 'TIME', 'MONEY', 'PERCENT', 'QUANTITY']:
            identified_pii.append((ent.text, ent.start_char, ent.end_char, ent.label_))
            #Debug Print
            # print(identified_pii)
    return identified_pii

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        text = request.form['text']
        # print(text)
        identified_pii = identify_pii(text)
        print("to generalize PII")
        print(identified_pii)
        # adding to see how logic works
        if len(identified_pii) == 0: identified_pii=[["Jane Doe", 10, 20, [ "J Doe", "J.D", "Jane D." ]]]
        modified_text = generalize_pii(text, identified_pii)
        return render_template('index.html', text=modified_text)
    else:
        return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
