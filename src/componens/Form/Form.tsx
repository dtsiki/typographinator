import { ChangeEvent, useState } from 'react';
import { addNonBreakingSpaces, addNonBreakingHyphens } from '../../utils';
import {
  COPY_STATUS_TEXT,
  DEFAULT_CONJUNCTION,
  DEFAULT_FORMATTING_PARAMS,
  DEFAULT_PARTICLES,
  DEFAULT_PREPOSITIONS,
  NON_BREAKING_HYPHEN,
  NON_BREAKING_SPACE,
} from '../../const';
import { ECopyStatus, EEntityType, TFormattingParams } from '../../types';

import styles from './Form.module.scss';

export const Form = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [params, setParams] = useState<TFormattingParams>(
    DEFAULT_FORMATTING_PARAMS,
  );
  const [copyStatus, setCopyStatus] = useState<ECopyStatus>(ECopyStatus.IDLE);

  const updateParams = (updatedParams: { [key: string]: boolean }) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...updatedParams,
    }));
  };

  const updateEntity = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prevParams) => ({
      ...prevParams,
      entityType: e.target.checked ? EEntityType.UNICODE : EEntityType.HTML,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let processedText = inputText;

    if (params.useBreakingSpaces) {
      processedText = addNonBreakingSpaces(processedText, params.entityType);
    }

    if (params.useBreakingHyphens) {
      processedText = addNonBreakingHyphens(processedText, params.entityType);
    }

    setOutputText(processedText);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopyStatus(ECopyStatus.COPIED);
      setTimeout(() => setCopyStatus(ECopyStatus.IDLE), 3000);
    } catch (error) {
      console.error('Ошибка при копировании: ', error);
      setCopyStatus(ECopyStatus.ERROR);
      setTimeout(() => setCopyStatus(ECopyStatus.IDLE), 3000);
    }
  };

  return (
    <form
      className={styles.form}
      aria-label="Форматирование текста"
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.form__main}>
        <fieldset className={styles.form__block}>
          <label htmlFor="input-textarea" className={styles.form__subtitle}>
            Исходный текст
          </label>
          <textarea
            id="input-textarea"
            className={styles.form__textarea}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Введите текст..."
          ></textarea>
          <button
            type="submit"
            className={styles.form__submit_button}
            disabled={!inputText}
          >
            Форматировать
          </button>
        </fieldset>
        <fieldset className={styles.form__block}>
          <label htmlFor="output-textarea" className={styles.form__subtitle}>
            Результат
          </label>
          <span className={styles.form__textarea_heading}>
            <button
              className={styles.form__textarea_button}
              onClick={handleCopy}
              disabled={!outputText}
            >
              {COPY_STATUS_TEXT[copyStatus]}
            </button>
          </span>
          <textarea
            id="output-textarea"
            className={styles.form__textarea}
            value={outputText}
            placeholder="Здесь появится отформатированный текст..."
          ></textarea>
        </fieldset>
      </fieldset>
      <fieldset className={styles.form__settings}>
        <h2 className={styles.form__subtitle}>Настройки</h2>
        <fieldset className={styles.form__block}>
          <label className={styles.form__checkbox_label}>
            <input
              type="checkbox"
              checked={params.useBreakingSpaces}
              onChange={(e) =>
                updateParams({ useBreakingSpaces: e.target.checked })
              }
              className={styles.form__checkbox}
            />
            Добавить неразрывные пробелы{' '}
            <code className="code">
              {NON_BREAKING_SPACE[params.entityType]}
            </code>
            <span className="hint">
              Символ неразрывного пробела предотвращает разрыв строки между
              словами. Обычно используется для&nbsp;запрета переноса слов
              с&nbsp;предлогами, частицами и&nbsp;союзами. Визуально выглядит
              как обычный пробел.
              <span className="divider" />
              Будут добавлены неразрывные пробелы для&nbsp;слов
              с&nbsp;предлогами {DEFAULT_PREPOSITIONS.join('/')}; с&nbsp;союзами{' '}
              {DEFAULT_CONJUNCTION.join('/')}; с&nbsp;частицами{' '}
              {DEFAULT_PARTICLES.join('/')}.
            </span>
          </label>
        </fieldset>
        <fieldset className={styles.form__block}>
          <label className={styles.form__checkbox_label}>
            <input
              type="checkbox"
              checked={params.useBreakingHyphens}
              onChange={(e) =>
                updateParams({ useBreakingHyphens: e.target.checked })
              }
              className={styles.form__checkbox}
            />
            Добавить неразрывные дефисы{' '}
            <code className="code">
              {NON_BREAKING_HYPHEN[params.entityType]}
            </code>
            <span className="hint">
              Символ неразрывного дефиса предотвращает разрыв строки между двумя
              словами или&nbsp;частями слова, которые разделены дефисом.
              Визуально не&nbsp;отличается от&nbsp;обычного дефиса.
            </span>
          </label>
        </fieldset>
        <fieldset className={styles.form__block}>
          <label className={styles.form__checkbox_label}>
            <input
              type="checkbox"
              checked={params.entityType === EEntityType.UNICODE}
              onChange={updateEntity}
              className={styles.form__checkbox}
            />
            Использовать Unicode
            <span className="hint">
              По умолчанию используется Unicode. Если убрать эту&nbsp;настройку,
              то будут использоваться соответствующие HTML&#x2011;сущности.
            </span>
          </label>
        </fieldset>
      </fieldset>
    </form>
  );
};
