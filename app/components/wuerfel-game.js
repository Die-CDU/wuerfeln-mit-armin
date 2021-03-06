import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import confetti from 'canvas-confetti';
import copy from 'copy-text-to-clipboard';

export default class WuerfelGameComponent extends Component {
  id = guidFor(this);

  @tracked dice1 = this._randomNumber();
  @tracked dice2 = this._randomNumber();
  @tracked dice3 = this._randomNumber();
  @tracked dice4 = this._randomNumber();
  @tracked dice5 = this._randomNumber();
  @tracked dice6 = this._randomNumber();
  @tracked dice7 = this._randomNumber();
  @tracked dice8 = this._randomNumber();
  @tracked dice9 = this._randomNumber();

  @tracked _playEnabled;

  get quoteText() {
    return (
      'Was wir jetzt brauchen, ist ' +
      (this.isMale5 ? 'einen ' : 'eine ') +
      this.text1 +
      this.text2 +
      ' ' +
      this.text3 +
      ' ' +
      this.text4 +
      this.text5 +
      ' bis ' +
      this.text6 +
      ' zur ' +
      this.text7 +
      ' ' +
      this.text8 +
      ' der ' +
      this.text9
    );
  }

  get fullQuoteText() {
    return this.quoteText + '\n— Armin Laschet';
  }

  get twitterText() {
    return encodeURIComponent(
      this.fullQuoteText + '\n\nhttps://die-cdu.github.io/wuerfeln-mit-armin/'
    );
  }

  get text1() {
    const TEXTS1 = ['ein-', 'zwei-', 'drei-', 'vier-', 'fünf-', 'sechs-'];
    return TEXTS1[this.dice1 - 1];
  }

  get text2() {
    const TEXTS2 = [
      'tägige',
      'wöchige',
      'monatige',
      'fache',
      'malige',
      'hebige',
    ];
    let text = TEXTS2[this.dice2 - 1];
    return this.isMale5 ? text + 'n' : text;
  }

  get text3() {
    const TEXTS3 = [
      'harte',
      'softe',
      'optionale',
      'intransparente',
      'alternativlose',
      'unumkehrbare',
    ];
    let text = TEXTS3[this.dice3 - 1];
    return this.isMale5 ? text + 'n' : text;
  }

  get text4() {
    const TEXTS4 = [
      'Wellenbrecher-',
      'Brücken-',
      'Treppen-',
      'Wende-',
      'Impf-',
      'Ehren-',
    ];
    return TEXTS4[this.dice4 - 1];
  }

  get text5() {
    const TEXTS5 = [
      'Lockdown',
      'Stopp',
      'Maßnahme',
      'Kampagne',
      'Sprint',
      'Matrix',
    ];
    return TEXTS5[this.dice5 - 1];
  }

  get isMale5() {
    return this.dice5 === 1 || this.dice5 === 2 || this.dice5 === 5;
  }

  get text6() {
    const TEXTS6 = [
      'zum Sommer',
      'auf Weiteres',
      'zur Bundestagswahl',
      '2030',
      'nach den Abiturprüfungen',
      'in die Puppen',
    ];
    return TEXTS6[this.dice6 - 1];
  }

  get text7() {
    const TEXTS7 = [
      'soforting',
      'nachhaltigen',
      'allmählichen',
      'unausweichlichen',
      'wirtschaftsschonenden',
      'willkürlichen',
    ];
    return TEXTS7[this.dice7 - 1];
  }

  get text8() {
    const TEXTS8 = [
      'Senkung',
      'Steigerung',
      'Beendigung',
      'Halbierung',
      'Vernichtung',
      'Beschönigung',
    ];
    return TEXTS8[this.dice8 - 1];
  }

  get text9() {
    const TEXTS9 = [
      'Infektionszahlen.',
      'privaten Treffen.',
      'Wirtschaftsleistung.',
      'Wahlprognosen.',
      'dritten Welle.',
      'Bundeskanzlerin.',
    ];
    return TEXTS9[this.dice9 - 1];
  }

  get playEnabled() {
    return this._playEnabled ?? window.localStorage.getItem('AUTOPLAY');
  }

  set playEnabled(value) {
    this._playEnabled = value;
    if (value) {
      window.localStorage.setItem('AUTOPLAY', 'true');
    } else {
      window.localStorage.removeItem('AUTOPLAY');
    }
  }

  get speech() {
    return window.speechSynthesis;
  }

  constructor() {
    super(...arguments);
    this.throwConfetti();

    if (this.playEnabled) {
      this.play();
    }
  }

  _reroll(index) {
    let oldValue = this['dice' + index];
    do {
      this['dice' + index] = this._randomNumber();
    } while (this['dice' + index] === oldValue);
  }

  @action reroll(index) {
    this._reroll(index);
    if (this.playEnabled) {
      this.play();
    }
  }

  @action rerollAll() {
    for (let i = 1; i <= 9; i++) {
      this._reroll(i);
    }

    this.throwConfetti();

    if (this.playEnabled) {
      this.play();
    }
  }

  @action copy() {
    copy(this.fullQuoteText);
  }

  throwConfetti() {
    let colors = ['#32302e', '#ca080c'];

    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
  }

  @action setPlayEnabled(event) {
    this.playEnabled = event.target.checked;
    if (this.playEnabled) {
      this.play();
    } else {
      this.speech.cancel();
    }
  }

  play() {
    if (this.speech) {
      let utterance = new SpeechSynthesisUtterance(this.quoteText);
      utterance.lang = 'de-DE';
      utterance.pitch = 0.7;
      this.speech.cancel();
      this.speech.speak(utterance);
    }
  }

  _randomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
