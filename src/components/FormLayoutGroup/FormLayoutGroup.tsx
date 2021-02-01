import React, { FunctionComponent, HTMLAttributes, MouseEvent } from 'react';
import getClassName from '../../helpers/getClassName';
import classNames from '../../lib/classNames';
import usePlatform from '../../hooks/usePlatform';
import { Removable, RemovePlaceholderProps } from '../Removable/Removable';
import withAdaptivity, { AdaptivityProps } from '../../hoc/withAdaptivity';

export interface FormLayoutGroupProps extends HTMLAttributes<HTMLDivElement>, RemovePlaceholderProps {
  mode?: 'vertical' | 'horizontal';
  /**
   * Только для режима horizontal.
   */
  removable?: boolean;
  /**
   * Только для removable. Визуально сдвигает кнопки удаления ниже, компенсируя высоту лейбла (например, свойство `top` у `<Input/>`).
   */
  removeButtonOffset?: boolean;
  /**
   * Коллбэк срабатывает при клике на контрол удаления.
   */
  onRemove?: (e: MouseEvent) => void;
}

const FormLayoutGroup: FunctionComponent<FormLayoutGroupProps> = withAdaptivity(({
  children,
  className,
  mode,
  removable,
  removePlaceholder,
  removeButtonOffset,
  onRemove,
  sizeY,
  ...restProps
}: FormLayoutGroupProps & Pick<AdaptivityProps, 'sizeY'>) => {
  const platform = usePlatform();

  const wrappedChildren = <div className="FormLayoutGroup__children">{children}</div>;

  return (
    <div
      className={classNames(
        getClassName('FormLayoutGroup', platform),
        `FormLayoutGroup--sizeY-${sizeY}`,
        `FormLayoutGroup--${mode}`,
        {
          'FormLayoutGroup--offset': removable && removeButtonOffset,
        },
        className,
      )}
      {...restProps}>
      {removable && mode === 'horizontal'
        ? <Removable removePlaceholder={removePlaceholder} onRemove={onRemove}>{wrappedChildren}</Removable>
        : wrappedChildren}
    </div>
  );
}, {
  sizeY: true,
});

FormLayoutGroup.defaultProps = {
  mode: 'vertical',
  removePlaceholder: 'Удалить',
};

export default FormLayoutGroup;
