import { toId } from '@sudoku/core';

import { emptyBoard } from '../emptyBoard';
import { Block } from './Block';
import { Slot } from './Slot';

export const LoadingBoard = () => (
  <>
    {emptyBoard.map((blockRow, blockRowIndex) =>
      blockRow.map((blocks, blockColIndex) => (
        <Block key={blockColIndex + blockRowIndex}>
          {blocks.map((slots, slotRowIndex) =>
            slots.map((slot, slotColIndex) => {
              const id = toId([
                blockRowIndex,
                blockColIndex,
                slotRowIndex,
                slotColIndex,
              ]);
              return (
                <Slot
                  isMutable={true}
                  isSelected={false}
                  isMistake={false}
                  isCoveredSlot={false}
                  hasSameContent={false}
                  key={id}
                >
                  {slot}
                </Slot>
              );
            }),
          )}
        </Block>
      )),
    )}
  </>
);
