import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';



type BottomPaperProps = {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
};

const BottomPaper = forwardRef<BottomSheet, BottomPaperProps>(
  ({ children, snapPoints = ['40%'] }, ref) => {
      const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);
     
      
   const {colorScheme}=useColorScheme();

    return (
       <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={memoSnapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: colorScheme==="dark"?"black":"white" }}
        handleIndicatorStyle={{backgroundColor: colorScheme==="dark"?"white":"black"}}
      >
        <BottomSheetView style={{ flex: 1 }} >
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomPaper;


