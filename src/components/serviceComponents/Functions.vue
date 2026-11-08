<template>
    <div class="function-wrapper">
        <div class="function-box">
            <div class="content">
                <div class="title">International Respondent Recruitment</div>
                <div class="description">Finding the right research participants shouldn't be a headache. Whether you
                    need consumers for user interviews, healthcare specialists, or B2B experts in specific sectors,
                    we've got you covered. Our global network means you can access quality participants across multiple
                    markets—all through a single point of contact. We're obsessive about participant quality, using
                    rigorous screening to ensure you're speaking with genuine, engaged respondents who meet your exact
                    criteria.</div>
            </div>
            <RotatingImage :image-src="function1" image-alt="Example image 1" direction="left" :tilt-angle="15"
                :initial-y-offset="150" />

        </div>
        <div class="function-box">
            <div class="content">
                <div class="title">Screener Design</div>
                <div class="description">To find the ideal respondents for your study, we need a solid screener. The
                    screener allows us to target the right audience by including the questions that confirm a person's
                    suitability. Our experts can design a screener from scratch, validate it with you, or review your
                    existing screener to identify any gaps or ambiguities that could hinder recruitment.</div>
            </div>
            <RotatingImage :image-src="function2" image-alt="Example image 1" direction="right" :tilt-angle="15"
                :initial-y-offset="150" />

        </div>
        <div class="function-box">
            <div class="content">
                <div class="title">Study/Research Design</div>
                <div class="description">At MadMarket, we collaborate with experienced researchers to help our clients
                    build the most effective study design to answer their specific business questions and build a
                    comprehensive plan. Our tailored research designs ensure that each project is strategically aligned
                    to provide actionable insights and drive business success.</div>
            </div>
            <RotatingImage :image-src="function3" image-alt="Example image 1" direction="left" :tilt-angle="15"
                :initial-y-offset="150" />

        </div>
        <div class="function-box">
            <div class="content">
                <div class="title">Discussion Guide Development</div>
                <div class="description">Our expert researchers will develop a comprehensive discussion guide in
                    collaboration with your team - outlining the timeline and requirements for your study. Then, our
                    trained moderators will use the guide to help achieve your research objectives, from warm-up
                    questions through to core objectives and the conclusion. </div>
            </div>
            <RotatingImage :image-src="function4" image-alt="Example image 1" direction="right" :tilt-angle="15"
                :initial-y-offset="150" />

        </div>
        <div class="function-box">
            <div class="content">
                <div class="title">Desk Research</div>
                <div class="description">While MadMarket is fundamentally a primary research business, we also assist
                    clients with secondary research when required. This can include summarising, collating, and
                    synthesising existing research. This approach can provide valuable insights and context to support
                    your research objectives.</div>
            </div>
            <RotatingImage :image-src="function5" image-alt="Example image 1" direction="left" :tilt-angle="15"
                :initial-y-offset="150" />

        </div>
        <div class="function-box">
            <div class="content">
                <div class="title">Analysis & Reporting</div>
                <div class="description">Consider us an extended arm of your team - we will deep dive into the analysis
                    and reporting of the data we gather to tease out the actionable insights that matter most. We get
                    involved in the full project life cycle and we offer different reporting formats, all depending on
                    your needs: from short summaries all the way to full reports with personas, verbatims, and
                    recommendations.​</div>
            </div>
            <RotatingImage :image-src="function6" image-alt="Example image 1" direction="right" :tilt-angle="15"
                :initial-y-offset="150" />

        </div>
        <div class="function-box">
            <div class="content">
                <div class="title">Translation and Transcripts</div>
                <div class="description">Whether you need stimuli translated or the full transcripts of focus group
                    recordings, MindMarket works with a global network of professional linguists, which allows us to
                    offer quicker turnaround times than most agencies. Our researchers can then use the collected
                    insights for their analysis and reporting.​</div>
            </div>
            <RotatingImage :image-src="function7" image-alt="Example image 1" direction="left" :tilt-angle="15"
                :initial-y-offset="150" />

        </div>
    </div>
</template>

<script setup lang="ts">
import RotatingImage from '@/components/ui/rotating-image/RotatingImage.vue';

import function1 from '@/img/photo/function1.jpg';
import function2 from '@/img/photo/function2.jpg';
import function3 from '@/img/photo/function3.jpg';
import function4 from '@/img/photo/function4.jpg';
import function5 from '@/img/photo/function5.jpg';
import function6 from '@/img/photo/function6.jpg';
import function7 from '@/img/photo/function7.jpg';

</script>

<style scoped>
.function-wrapper {
    width: 100%;
    min-height: 100vh;
    border-radius: 4rem;
    background-color: #E0DBCE;
    position: relative;
    z-index: 2;
}

.function-box {
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: row;
    padding: 8rem 10rem 0 8rem;
    border-bottom: 0.5px solid #383838;
    gap: 2.7rem;
}

.function-box:last-child {
    border-bottom: none;
}

.content {
    width: 750px;
    height: auto;
}

.title {
    font-size: 2.25rem;
    font-weight: 600;
    letter-spacing: -1px;
}

.description {
    margin-top: 4.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    max-width: 400px;
}
</style>