// Импорт необходимых зависимостей
import { useRef, useState } from 'react'; // Хуки React
import clsx from 'clsx'; // Утилита для условного объединения классов

// Импорт стилей
import styles from './ArticleParamsForm.module.scss';

// Импорт констант с настройками статьи
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

// Импорт UI компонентов
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

// Тип пропсов компонента
type ArticleParamsFormProps = {
	onStateChange: (props: ArticleStateType) => void;
};

// Основной компонент формы параметров статьи
export const ArticleParamsForm = ({
	onStateChange,
}: ArticleParamsFormProps) => {
	// Состояние открытия/закрытия сайдбара
	const [isSidebarOpen, setSidebarIsOpen] = useState(false);
	// Локальное состояние формы
	const [formState, setFormState] = useState(defaultArticleState);
	// Ref для обработки кликов вне элемента
	const ref = useRef<HTMLDivElement | null>(null);

	// Хук для закрытия сайдбара при клике вне его области
	useOutsideClickClose({
		isOpen: isSidebarOpen,
		onChange: setSidebarIsOpen,
		rootRef: ref,
	});

	// Обработчик отправки формы
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onStateChange(formState);
	};

	// Обработчик сброса формы  по умолчанию
	const handleReset = () => {
		setFormState(defaultArticleState);
		onStateChange(defaultArticleState);
	};

	return (
		<div ref={ref}>
			{/* Кнопка для открытия/закрытия сайдбара */}
			<ArrowButton
				onClick={() => setSidebarIsOpen(!isSidebarOpen)}
				isOpen={isSidebarOpen}
			/>

			{/* Сайдбар с формой */}
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					{/* Заголовок формы */}
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Выбор шрифта */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
					/>

					{/* Выбор размера шрифта */}
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						title='размер шрифта'
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>

					{/* Выбор цвета шрифта */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
					/>

					{/* Разделитель */}
					<Separator />

					{/* Выбор цвета фона */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
					/>

					{/* Выбор ширины контента */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
					/>

					{/* Кнопки формы */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
