import React from "react";

type TableCellData = {
    title: string;
    subtitle: string;
};

type TableInfoProps = {
    data: TableCellData[][];
};

const TableInfo = ({ data }: TableInfoProps) => {
    const TableCell = ({ title, subtitle }: TableCellData) => (
        <div className="py-2  text-center flex-1 gap-1 lg:gap-0 flex flex-col items-center  justify-center">
            <div className="text-white  w-full font-bold  lg:text-3xl lg:font-medium leading-relaxed  ">{title}</div>
            <div className="text-white/80  w-full  text-footnote lg:text-lg">{subtitle}</div>
        </div>
    );
    const TableRow = ({ row }: { row: TableCellData[] }) => (
        <div className="flex w-full items-center lg:gap-20">
            {row.map((cell, idx) => (
                <React.Fragment key={idx}>
                    <TableCell {...cell} />
                    {idx < row.length - 1 && <div className="h-8 w-[1] lg:hidden bg-white/15" />}
                </React.Fragment>
            ))}
        </div>
    );
    return (
        <div className="mt-[-80] lg:mt-[-30] xl:mt-[-80] xl:-translate-y-[8vw] 4xl:!-translate-y-[120px] relative z-2 px-4">
            <div className="gradient-primary rounded-3xl py-2 px-8 lg:px-2 lg:py-6">
                <div className="flex flex-col lg:grid grid-cols-2 items-center gap-2 lg:gap-20">
                    {data.map((row, idx) => (
                        <React.Fragment key={idx}>
                            <TableRow row={row} />
                            {idx < data.length - 1 && <div className="w-full h-[1] lg:hidden bg-white/15 " />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableInfo;