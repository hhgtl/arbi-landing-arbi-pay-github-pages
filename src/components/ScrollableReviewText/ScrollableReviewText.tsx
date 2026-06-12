import {useEffect, useRef, useState} from "react";
import s from './ScrollableReviewText.module.scss'
import clsx from "clsx";
export const ScrollableReviewText = ({ text }: { text: string }): JSX.Element => {
    const textRef = useRef<HTMLParagraphElement | null>(null);
    const [hasScroll, setHasScroll] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const updateScrollState = () => {
        const el = textRef.current;
        if (!el) return;

        const maxScroll = el.scrollHeight - el.clientHeight;
        const nextHasScroll = maxScroll > 2;

        setHasScroll(nextHasScroll);
        setScrollProgress(nextHasScroll ? el.scrollTop / maxScroll : 0);
    };

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        updateScrollState();

        const resizeObserver = new ResizeObserver(updateScrollState);
        resizeObserver.observe(el);

        window.addEventListener("resize", updateScrollState);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateScrollState);
        };
    }, [text]);

    return (
        <div
            className={clsx(
                s.reviewTextWrapper,
                hasScroll && s.reviewTextWrapperScrollable,
            )}
            style={
                {
                    "--review-scroll-progress": scrollProgress,
                } as React.CSSProperties
            }
        >
            <p
                ref={textRef}
                className={s.reviewText}
                onScroll={updateScrollState}
            >
                {text}
            </p>
            {hasScroll ? (
                <span className={s.reviewScrollTrack} aria-hidden="true">
          <span className={s.reviewScrollIndicator} />
        </span>
            ) : null}
        </div>
    );
};