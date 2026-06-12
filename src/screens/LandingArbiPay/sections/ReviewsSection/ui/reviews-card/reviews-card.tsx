import s from './reviews-card.module.scss'
import Image from '../../../../../../assets/img/reviews.png'
import StarsIcon from '../../../../../../assets/icons/reviews.svg?react'
import {ScrollableReviewText} from "../../../../../../components/ScrollableReviewText/ScrollableReviewText.tsx";

type ReviewsCardProps = {
    name: string
    company: string
    date: string
    text: string
    reviewUrl: string
    authorPhotoUrl: string
}

export const ReviewsCard = ({name, company, date, text, reviewUrl, authorPhotoUrl}: ReviewsCardProps) => {
    return (
        <div className={s.card}>
            <div className={s.headerWrapper}>
                <div className={s.header}>
                    <div className={s.leftBox}>
                        <div className={s.avatarWrapper}>
                            <img src={authorPhotoUrl || Image} alt="" />
                        </div>
                        <div>
                            <h3 className={s.title}>{name}</h3>
                            {/*<p className={s.subtitle}>{company}</p>*/}
                        </div>
                    </div>
                    <div className={s.rightBox}>
                        <p className={s.dateDesktop}>{date}</p>
                        {/*review.platform === "google"*/}
                        {reviewUrl ? (
                            <a
                                className={s.reviewGoogleLink}
                                href={reviewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open review in Google"
                            >
                                <span className={s.reviewGoogleIcon}>G</span>
                                <span>Google</span>
                            </a>
                        ) : null}
                    </div>
                </div>
                <StarsIcon className={s.starsIcon}/>
            </div>

            {/*<p className={s.bodyText}>*/}
            {/*    {text}*/}
            {/*</p>*/}
            <ScrollableReviewText text={text} />
            <p className={s.dateMobile}>{date}</p>
        </div>
    )
}