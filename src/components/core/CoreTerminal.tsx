import styles from './CoreTerminal.module.css';

type Props = {
  path?: string;
  prefix?: string;
  githubuser: string;
  value: string;
};

const CoreTerminal = ({ path, prefix, value, githubuser }: Props) => {
  return (
    <>
      <div className="mb-4 flex flex-auto justify-center text-[38px] md:text-[45px] select-none">
        <span className="inline-flex mr-[10px] text-emerald-600">
          {githubuser.toLowerCase()}
          <span className="relative top-[4px]">@</span>
          {!prefix ? (
            <span className="mr-4"></span>
          ) : (
            <span className="mr-2">{prefix}</span>
          )}
          <span className="text-zinc-500">:</span>
          <span>{path}</span>

          <span className="text-zinc-500">$</span>
        </span>
        <span className={styles.cursorWrap}>
          <span
            // className="text-gradient bg-gradient-to-r from-blue-400 to-emerald-400"
            className={`${styles.cursor} text-gradient bg-gradient-to-r from-blue-400 to-emerald-400`}
          >
            {value}
          </span>
        </span>
      </div>
    </>
  );
};

export default CoreTerminal;
